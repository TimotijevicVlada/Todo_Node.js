import React from 'react';
import css from "./Header.module.scss";
import { useRouter } from 'next/router';

const Header = () => {

    const router = useRouter();

    const handleRouting = (route: string) => {
        router.push(route);
    }

    return (
        <div className={css.container}>
            <span
                className={router.pathname === "/" ? css.active : ""}
                onClick={() => handleRouting("/")}
            >
                Home
            </span>
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
        </div>
    )
}

export default Header;