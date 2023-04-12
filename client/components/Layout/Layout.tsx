import React, { FC } from 'react';
import css from "./Layout.module.scss";
import Cookies from 'js-cookie';

//components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//types
import { LayoutProps } from '@/types/layout';

const Layout: FC<LayoutProps> = ({ children }) => {

    const username = Cookies.get("username");
    const userId = Cookies.get("userId");

    return (
        <div className={css.container}>
            <Header
                username={username}
                userId={userId}
            />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;