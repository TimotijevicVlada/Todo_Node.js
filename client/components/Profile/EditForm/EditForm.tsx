import { FC } from 'react';
import css from "./EditForm.module.scss";
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

//api
import axios from 'axios';
import { Routes } from '@/api/routes';
import { useMutation, useQueryClient } from 'react-query';

//types
import { EditFormProps, UserProps } from '@/types/profile';

const EditForm: FC<EditFormProps> = ({ editData, setEditData }) => {

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...editData,
            password: ""
        }
    })

    const { mutate: editProfile } = useMutation({
        mutationFn: (data: UserProps) => axios.put(Routes.updateUser, data),
        onSuccess: (data) => {
            queryClient.setQueryData(["user", data.data._id], () => data.data);
            enqueueSnackbar("Profile updated", {
                variant: "success",
                autoHideDuration: 3000
            });
        }
    })

    const onSubmit = (data: any) => {
        editProfile(data)
    };

    return (
        <form
            className={css.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={css.inputWrapper}>
                <input
                    type="text"
                    placeholder='Type username'
                    {...register("username", { required: true })}
                />
                {errors.username && <div className={css.error}>Username is required</div>}
            </div>
            <div className={css.inputWrapper}>
                <input
                    type="text"
                    placeholder='Type email'
                    {...register("email", { required: true })}
                />
                {errors.email && <div className={css.error}>Email is required</div>}
            </div>
            <div className={css.inputWrapper}>
                <input
                    type="text"
                    placeholder='Type password'
                    {...register("password", { required: true })}
                />
                {errors.password && <div className={css.error}>Password is required</div>}
            </div>
            <div className={css.actionButtonsWrapper}>
                <button onClick={() => setEditData(null)}>Cancel</button>
                <button type='submit'>Edit</button>
            </div>
        </form>
    )
}

export default EditForm;