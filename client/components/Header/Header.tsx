import React, { FC, useEffect } from 'react';
import css from "./Header.module.scss";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

//api
import axios from 'axios';
import { useQuery } from 'react-query';
import { Routes } from '@/api/routes';

//jotai
import { useAtom } from 'jotai';
import { userAtom } from '@/jotai/userAtom';

//types
import { HeaderProps } from '@/types/header';

interface UserProps {
    createdAt: string;
    updatedAt: string;
    email: string;
    username: string;
    password: string;
    profilePicture: string;
    _id: string;
}

const Header: FC<HeaderProps> = ({ username, userId }) => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const handleRouting = (route: string) => {
        router.push(route);
    }

    useEffect(() => {
        if (username) {
            setLoggedUser(username);
        }
    }, [username])

    const { data: user } = useQuery<UserProps>(["user", userId], async ({ queryKey }: any) => {
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
            <span
                className={router.pathname === "/" ? css.active : ""}
                onClick={() => handleRouting("/")}
            >
                Home
            </span>
            {loggedUser ?
                <>
                    {user?.profilePicture ?
                        <img
                            src={baseUrl + user.profilePicture}
                            alt="profile_image"
                            onClick={() => handleRouting(`/profile/${userId}`)}
                        />
                        :
                        <div
                            className={css.profile}
                            onClick={() => handleRouting(`/profile/${userId}`)}
                        >
                            <span>{username?.charAt(0)}</span>
                        </div>
                    }
                    <span onClick={() => {
                        Cookies.remove("username");
                        Cookies.remove("userId");
                        setLoggedUser(null);
                        router.push("/login");
                        enqueueSnackbar("You are logged out", {
                            variant: "success",
                            autoHideDuration: 3000
                        });
                    }}>
                        Logout
                    </span>
                </>
                :
                <>
                    <span
                        className={router.pathname === "/register" ? css.active : ""}
                        onClick={() => handleRouting("/register")}
                    >
                        Register
                    </span>
                    <span
                        className={router.pathname === "/login" ? css.active : ""}
                        onClick={() => handleRouting("/login")}
                    >
                        Login
                    </span>
                </>
            }
        </div>
    )
}

export default Header;