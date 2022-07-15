import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';

import { authSliceActions } from 'redux/slices/authSlice';
import { eventSliceActions } from 'redux/slices/eventSlice';

function Banner() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.auth.message || state.event.message);

    const handleClose = () => {
        dispatch(authSliceActions.setMessage(''));
        dispatch(eventSliceActions.setMessage(''));
    };

    return (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={message !== null && message !== ''}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
        />
    );
}

export default Banner;
