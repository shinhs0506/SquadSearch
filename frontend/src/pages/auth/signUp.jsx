import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authSliceActions } from 'redux/slices/authSlice';
import NewProfileForm from 'components/newProfileForm/newProfileForm';

function SignUp() {
    let isSignningUp = useSelector((state) => state.auth.isSignningUp);
    let nagivate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        if (isSignningUp) {
            nagivate('/login')
            dispatch(authSliceActions.setIsSignningUp(false));
        }
    }, [isSignningUp])

    return (
        <div>
            <NewProfileForm />
        </div>
    );
}

export default SignUp;
