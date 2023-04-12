import React, { FC, useEffect } from 'react';
import css from "./Header.module.scss";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

//jotai
import { useAtom } from 'jotai';
import { userAtom } from '@/jotai/userAtom';

//types
import { HeaderProps } from '@/types/header';

const Header: FC<HeaderProps> = ({ username, userId }) => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [loggedUser, setLoggedUser] = useAtom(userAtom);

    const handleRouting = (route: string) => {
        router.push(route);
    }

    useEffect(() => {
        if (username) {
            setLoggedUser(username);
        }
    }, [username])

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
                    <div
                        className={css.profile}
                        onClick={() => router.push(`/profile/${userId}`)}
                    >
                        <span>{username?.charAt(0)}</span>
                    </div>
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