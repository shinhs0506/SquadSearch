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
                {/* 
                <br />
                <label htmlFor="confirm_password">
                    Confirm Password
                    <input type="password" id="confirm_password" name="confirm_password" ref={profileConfirm} required />
                </label>
                <br />
                */}
                {/* 
                <label htmlFor="display_name">
                    Display Name
                    <input type="text" id="display_name" name="display_name" ref={profileDname} required />
                </label>
                <br />
                */}
                {/* 
                <label htmlFor="phone_number">
                    Phone Number
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_number" ref={profileNum} />
                </label>
                <br />
                */}
                {/* 
                <label htmlFor="profile_pic">
                    Profile Picture
                    <input type="file" id="profile_pic" name="profile_pic" ref={profilePic} />
                </label>
                <br />
                */}
                {/* 
                <label htmlFor="bio">
                    Bio
                    <textarea id="bio" name="bio" rows="4" cols="30" ref={profileBio} />
                </label>
                <br />
                */}
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}
