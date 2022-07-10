import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import { profileActions } from "redux/slices/profileSlice"

function Logout() {
    const dispatch = useDispatch()
    const nagivate = useNavigate()

    dispatch(profileActions.logout())
    let isLoggedIn = useSelector((state) => state.profile.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            nagivate('/login')
        }
    }, [isLoggedIn])

    return (
        <div>
            Log out
        </div>
    )
}

export default Logout
