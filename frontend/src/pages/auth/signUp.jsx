import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUpComp from 'components/newProfileForm/SignUp';
import { authSliceActions } from 'redux/slices/authSlice';

function SignUp() {
    const isSignningUp = useSelector((state) => state.auth.isSignningUp);
    const nagivate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSignningUp) {
            nagivate('/login');
            dispatch(authSliceActions.setIsSignningUp(false));
        }
    }, [isSignningUp]);

    return (
        <div>
            <SignUpComp />
            {/* <NewProfileForm /> */}
        </div>
    );
}

export default SignUp;
