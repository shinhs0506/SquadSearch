import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { authSliceActions } from 'redux/slices/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);

    const logout = async () => {
        dispatch(authSliceActions.logoutUser({ email }));
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
            const { name, email, exp } = decodedData;
            if (!(Date.now() >= exp * 1000)) {
                dispatch(authSliceActions.setLoginWithToken({ name, email }));
            }
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);
};

export { useLogout, useCheckLogin };
