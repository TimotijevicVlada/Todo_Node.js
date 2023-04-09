import React from 'react';
import Register from '@/components/Register/Register';

const register = () => {
    return (
        <div style={{
            minHeight: "calc(100vh - 8rem)",
            width: "100%"
        }}>
            <Register />
        </div>
    )
}

export default register;