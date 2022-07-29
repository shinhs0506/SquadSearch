import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { authSliceActions } from 'redux/slices/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const logout = async () => {
        if (user) {
            console.log(user);
            const { email } = user;
            dispatch(authSliceActions.logoutUser({ email }));
        }
    };

    return logout;
};

const useCheckLogin = () => {
    const dispatch = useDispatch();
    const tokenHeader = localStorage.getItem('tokenHeader');
    const tokenBody = localStorage.getItem('tokenBody');

    const checkLogin = () => {
        if (tokenHeader && tokenBody) {
            const decodedData = jwtDecode(`${tokenHeader}.${tokenBody}`);
            const { user, exp } = decodedData;
            if (!(Date.now() >= exp * 1000)) {
                dispatch(authSliceActions.setLoginWithToken(user));
            }
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);
};

export { useLogout, useCheckLogin };
