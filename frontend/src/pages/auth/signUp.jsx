import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { profileActions } from 'redux/slices/profileSlice';
import NewProfileForm from 'components/newProfileForm/newProfileForm';

function SignUp() {
    let isSignningUp = useSelector((state) => state.profile.isSignningUp);
    let nagivate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        if (isSignningUp) {
            nagivate('/login')
            dispatch(profileActions.setIsSignningUp(false));
        }
    }, [isSignningUp])

    return (
        <div>
            <NewProfileForm />
        </div>
    );
}

export default SignUp;
