import React from 'react';
import css from "./Register.module.scss";

const Register = () => {
    return (
        <div className={css.container}>
            <form>
                <h3 className={css.title}>Register</h3>
                <div className={css.inputWrapper}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder='Insert username'
                    />
                </div>
                <div className={css.inputWrapper}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder='Insert email'
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
                    <button type='submit'>Create account</button>
                </div>
            </form>
        </div>
    )
}

export default Register;