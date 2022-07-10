import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginForm from 'components/loginForm/loginForm'

// TODO: Maybe have this be a pop-up instead

function Login() {
    let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    let nagivate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            nagivate('/')
        }
    }, [isLoggedIn])

    return (
        <>
            <LoginForm />
        </>
    );
}

export default Login;
