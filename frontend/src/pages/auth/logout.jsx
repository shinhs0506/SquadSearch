import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

import { authSliceActions } from "redux/slices/authSlice"

function Logout() {
    const dispatch = useDispatch()
    const nagivate = useNavigate()

    dispatch(authSliceActions.logout())
    let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
