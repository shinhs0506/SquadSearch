import { useDispatch } from 'react-redux';
import { editProfile } from 'redux/slices/profileSlice';
import { React, useRef } from 'react';

// TODO: Maybe look into redux form

export default function EditProfileForm() {
    const dispatch = useDispatch();
    const profileUname = useRef();
    const profilePassword = useRef();
    const profileConfirm = useRef();
    const profileDname = useRef();
    const profileEmail = useRef();
    const profileNum = useRef();
    const profilePic = useRef();
    const profileBio = useRef();

    function dispatchInput() {
        const username = profileUname.current.value;
        const pass = profilePassword.current.value;
        const dName = profileDname.current.value;
        const email = profileEmail.current.value;
        const phoneNum = profileNum.current.value;
        const pic = profilePic.current.value;
        const bio = profileBio.current.value;

        dispatch(editProfile({
            username,
            pass,
            dName,
            email,
            phoneNum,
            pic,
            bio,
        }));
    }
    // TODO: Put restrictions on input fields like password chars and confirm pass matching.
    return (
        <div>
            <h1>Edit Profile</h1>
            <form
              id="new_profile"
              onSubmit={(event) => {
                  event.preventDefault();
                  dispatchInput();
              }}
            >
                <label htmlFor="username">
                    Username
                    <input type="text" id="username" name="username" ref={profileUname} minLength="10" maxLength="20" required />
                </label>
                <br />
                <label htmlFor="password">
                    Password
                    <input type="password" id="password" name="password" ref={profilePassword} required />
                </label>
                <br />
                <label htmlFor="confirm_password">
                    Confirm Password
                    <input type="password" id="confirm_password" name="confirm_password" ref={profileConfirm} required />
                </label>
                <br />
                <label htmlFor="display_name">
                    Display Name
                    <input type="text" id="display_name" name="display_name" ref={profileDname} required />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                    <input type="email" id="email" name="email" ref={profileEmail} required />
                </label>
                <br />
                <label htmlFor="phone_number">
                    Phone Number
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_number" ref={profileNum} />
                </label>
                <br />
                <label htmlFor="profile_pic">
                    Profile Picture
                    <input type="file" id="profile_pic" name="profile_pic" ref={profilePic} />
                </label>
                <br />
                <label htmlFor="bio">
                    Bio
                    <textarea id="bio" name="bio" rows="4" cols="30" ref={profileBio} />
                </label>
                <br />
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}
