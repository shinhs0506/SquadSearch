import { React, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { authSliceActions } from 'redux/slices/authSlice';

// TODO: Maybe look into redux form

export default function NewProfileForm() {
    const dispatch = useDispatch();
    const profileUname = useRef();
    const profilePassword = useRef();
    // const profileConfirm = useRef();
    // const profileDname = useRef();
    const profileEmail = useRef();
    // const profileNum = useRef();
    // const profilePic = useRef();
    // const profileBio = useRef();

    function dispatchInput(e) {
        e.preventDefault();

        const name = profileUname.current.value;
        const password = profilePassword.current.value;
        // const dName = profileDname.current.value;
        const email = profileEmail.current.value;
        // const phoneNum = profileNum.current.value;
        // const pic = profilePic.current.value;
        // const bio = profileBio.current.value;

        dispatch(authSliceActions.signupUser({
            name,
            email,
            // dName,
            password,
            // phoneNum,
            // pic,
            // bio,
        }));
    }
    // TODO: Put restrictions on input fields like password chars and confirm pass matching.
    return (
        <div>
            <h1>Create Profile</h1>
            <form
                id="new_profile"
                onSubmit={dispatchInput}
            >
                <label htmlFor="username">
                    Username
                    <input type="text" id="username" name="username" ref={profileUname} required />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                    <input type="email" id="email" name="email" ref={profileEmail} required />
                </label>
                <br />
                <label htmlFor="password">
                    Password
                    <input type="password" id="password" name="password" ref={profilePassword} required />
                </label>
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}
