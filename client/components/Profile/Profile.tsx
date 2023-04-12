import React from 'react';
import css from "./Profile.module.scss";
import { useRouter } from 'next/router';

//api
import axios from 'axios';
import { Routes } from '@/api/routes';
import { useQuery } from 'react-query';

//assets
import User from "../../svg/user_holder.svg";

interface UserProps {
    createdAt: string;
    updatedAt: string;
    email: string;
    username: string;
    password: string;
    profilePicture: string;
    _id: string;
}

const Profile = () => {

    const router = useRouter();

    const { data: user, isLoading, isError } = useQuery<UserProps>(["user", router.query.id], async ({ queryKey }: any) => {
        const id = queryKey[1];
        const response = await axios.get(Routes.getUser, {
            params: {
                id: id
            }
        })
        return response.data;
    })

    return (
        <div className={css.container}>
            <div className={css.userWrapper}>
                <User />
            </div>
            <div className={css.userInfo}>
                {isLoading ?
                    <div>Loading...</div>
                    :
                    <div className={css.profileInfo}>
                        <div>User: {user?.username}</div>
                        <div>Email: {user?.email}</div>
                        <div>Created at: {user?.createdAt}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;