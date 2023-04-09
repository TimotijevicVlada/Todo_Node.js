import Login from '@/components/Login/Login';
import React from 'react'

const login = () => {
  return (
    <div style={{
      minHeight: "calc(100vh - 8rem)",
      width: "100%"
    }}>
      <Login />
    </div>
  )
}

export default login;