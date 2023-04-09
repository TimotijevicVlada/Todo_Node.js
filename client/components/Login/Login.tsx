import React from 'react';
import css from "./Login.module.scss";

const Login = () => {
    return (
        <div className={css.container}>
            <form>
                <h3 className={css.title}>Login</h3>
                <div className={css.inputWrapper}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder='Insert username'
                    />
                </div>
                <div className={css.inputWrapper}>
                    <label>Password</label>
                    <input
                        type="text"
                        placeholder='Insert password'
                    />
                </div>
                <div className={css.inputWrapper}>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;