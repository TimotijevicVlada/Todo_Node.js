import React, { FC, useEffect, useState } from 'react';
import css from "./Header.module.scss";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

//types
import { HeaderProps } from '@/types/header';

const Header: FC<HeaderProps> = ({ user }) => {

    const router = useRouter();

    const [loggedUser, setLoggedUser] = useState(false);

    const handleRouting = (route: string) => {
        router.push(route);
    }

    useEffect(() => {
        if (user) {
            setLoggedUser(true);
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
                    <span onClick={() => {
                        Cookies.remove("user");
                        setLoggedUser(false);
                    }}>
                        Logout
                    </span>
                    <div className={css.profile}>
                        <span>{user?.charAt(0)}</span>
                    </div>
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