import { useDispatch } from 'react-redux';

import { authSliceActions } from 'redux/slices/authSlice'

const useLogout = () => {
    const dispatch = useDispatch()

    const logout = async() => {
        dispatch(authSliceActions.logout());
    }

    return logout;
}

export default useLogout
