import React, { FC } from 'react';
import css from "./Layout.module.scss";

//types
import { LayoutProps } from '@/types/layout';

const Layout: FC<LayoutProps> = ({ children }) => {

    return (
        <div className={css.container}>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout;