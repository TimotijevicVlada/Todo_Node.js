import React, { FC, useEffect, useState } from 'react';
import css from "./Header.module.scss";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

//jotai
import { useAtom } from 'jotai';
import { userAtom } from '@/jotai/userAtom';

//types
import { HeaderProps } from '@/types/header';

const Header: FC<HeaderProps> = ({ user }) => {

    const router = useRouter();

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const handleRouting = (route: string) => {
        router.push(route);
    }

    useEffect(() => {
        if (user) {
            setLoggedUser(user);
        }
    }, [user])

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
                    <div className={css.profile}>
                        <span>{user?.charAt(0)}</span>
                    </div>
                    <span onClick={() => {
                        Cookies.remove("user");
                        setLoggedUser(null);
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