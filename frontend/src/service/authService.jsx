import { useDispatch } from 'react-redux';
import { profileActions } from 'redux/slices/profileSlice'

const useLogout = () => {
    const dispatch = useDispatch()

    const logout = async() => {
        dispatch(profileActions.logout());
    }

    return logout;
}

export default useLogout
