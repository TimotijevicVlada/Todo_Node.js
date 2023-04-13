import React from 'react';
import css from "./Login.module.scss";
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

//api
import { Routes } from '@/api/routes';
import { useMutation } from 'react-query';
import axios from 'axios';

//form
import { useForm } from "react-hook-form";

//jotai
import { useAtom } from 'jotai';
import { userAtom } from '@/jotai/userAtom';

interface LoginFormProps {
    username: string;
    password: string;
}

const Login = () => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormProps>();

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const { mutate: loginUser, isError, error }: any = useMutation({
        mutationFn: (data: LoginFormProps) => axios.post(Routes.loginRoute, data),
        onSuccess: (data, variables) => {
            enqueueSnackbar("You are logged in", {
                variant: "success",
                autoHideDuration: 3000
            });
            reset();
            Cookies.set('username', variables.username, { expires: 30 });   // 30 days after setting the cookies 
            Cookies.set('userId', data.data._id, { expires: 30 });   // 30 days after setting the cookies 
            setLoggedUser(variables.username);
            router.push("/");
        }
    })

    const onSubmit = (data: LoginFormProps) => {
        loginUser(data);
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={css.title}>Login</h3>
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
                    <button type='submit'>Login</button>
                    {isError &&
                        <p className={`${css.error} ${css.mainError}`}>{error?.response?.data}</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login;