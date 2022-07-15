import { useDispatch, useSelector } from 'react-redux';

import { authSliceActions } from 'redux/slices/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);

    const logout = async () => {
        dispatch(authSliceActions.logoutUser({ email }));
    };

    return logout;
};

export default useLogout;
