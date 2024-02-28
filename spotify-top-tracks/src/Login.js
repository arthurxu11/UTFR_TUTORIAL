// Login.js
import React from 'react';
import { Button } from '@mui/material';

const Login = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/';
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" onClick={handleLogin}>
        {/* TODO: Add text in the button */}
      </Button>
    </div>
  );
}

export default Login;
