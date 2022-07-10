import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginForm from 'components/loginForm/loginForm';

function Login() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const nagivate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            nagivate('/');
        }
    }, [isLoggedIn]);

    return (
        <LoginForm />
    );
}

export default Login;
