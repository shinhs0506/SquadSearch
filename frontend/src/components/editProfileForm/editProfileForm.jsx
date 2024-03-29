import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authSliceActions } from 'redux/slices/authSlice';

export default function EditProfileForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);

    function dispatchInput(e) {
        e.preventDefault();

        const body = new FormData(e.target);

        dispatch(authSliceActions.updateUser({ body }));
    }

    return (
        <div>
            <h1 id="title">Edit Profile</h1>
            <form id="new_profile" onSubmit={dispatchInput}>
                <div className="input-container ic1">
                    <label htmlFor="name">
                        Username
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          minLength="10"
                          maxLength="20"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="password">
                        Password
                        <input type="password" id="password" name="password" />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="confirm_password">
                        Confirm Password
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="profilePicture">
                        Profile Picture
                        <input
                          type="file"
                          accept="image/png"
                          id="profilePicture"
                          name="profilePicture"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="bio">
                        Bio
                        <textarea
                          id="bio"
                          name="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows="4"
                          cols="30"
                        />
                    </label>
                </div>

                <br />
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}
