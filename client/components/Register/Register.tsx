import React from 'react';
import css from "./Register.module.scss";
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

//api
import { Routes } from '@/api/routes';
import { useMutation } from 'react-query';
import axios from 'axios';

//form
import { useForm } from "react-hook-form";

//types
import { RegisterFormProps } from '@/types/register';

const Register = () => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>();

    const { mutate: registerUser, isError, isLoading, error }: any = useMutation({
        mutationFn: (data: RegisterFormProps) => axios.post(Routes.registerRoute, data),
        onSuccess: () => {
            enqueueSnackbar("Account successfully created", {
                variant: "success",
                autoHideDuration: 3000
            });
            router.push("/login");
        }
    })

    const onSubmit = (data: RegisterFormProps) => {
        registerUser(data);
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={css.title}>Register</h3>
                <div className={css.inputWrapper}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder='Insert username'
                        {...register("username", { required: true })}
                    />
                    {errors.username && <span className={css.error}>Username is required</span>}
                </div>
                <div className={css.inputWrapper}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder='Insert email'
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />
                    {errors.email?.type === "required" && <span className={css.error}>Email is required</span>}
                    {errors.email?.type === "pattern" && <span className={css.error}>Invalid email format</span>}
                </div>
                <div className={css.inputWrapper}>
                    <label>Password</label>
                    <input
                        type="text"
                        placeholder='Insert password'
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password?.type === "required" && <span className={css.error}>Password is required</span>}
                    {errors.password?.type === "minLength" && <span className={css.error}>Min 6 caracters</span>}
                </div>
                <div className={css.inputWrapper}>
                    <button type='submit'>Create account</button>
                    {isError &&
                        <p className={`${css.error} ${css.mainError}`}>{error?.response?.data}</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Register;