import Profile from '@/components/Profile/Profile';
import React from 'react'

const profile = () => {
    return (
        <div style={{
            minHeight: "calc(100vh - 8rem)",
            width: "100%"
        }}>
            <Profile />
        </div>
    )
}

export default profile;