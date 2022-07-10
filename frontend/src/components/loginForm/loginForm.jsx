import { React, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { profileActions } from 'redux/slices/profileSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const emailInput = useRef();
    const passwordInput = useRef();

    function dispatchInput(e) {
        e.preventDefault()

        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        dispatch(profileActions.loginUser({
            email,
            password,
        }));
    }

    // TODO: Put restrictions on input fields like password chars and confirm pass matching.
    return (
        <div>
            <h1>Login</h1>
            <form
              id="new_profile"
              onSubmit={dispatchInput}
            >
                <label htmlFor="email">
                    Email
                    <input type="text" ref={emailInput} required />
                </label>
                <br />
                <label htmlFor="password">
                    Password
                    <input type="text" ref={passwordInput} required />
                </label>
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}

export default LoginForm
