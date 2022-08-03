import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { authSliceActions } from 'redux/slices/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const logout = async () => {
        if (user) {
            const token = localStorage.getItem('token');
            dispatch(authSliceActions.logoutUser({ token }));
        }
    };

    return logout;
};

const useCheckLogin = () => {
    const dispatch = useDispatch();
    const token= localStorage.getItem('token');

    const checkLogin = () => {
        if (token) {
            const decodedData = jwtDecode(token);
            const { exp } = decodedData;
            if (!(Date.now() >= exp * 1000)) {
                dispatch(authSliceActions.forceLogin());
            }
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);
};

export { useLogout, useCheckLogin };
