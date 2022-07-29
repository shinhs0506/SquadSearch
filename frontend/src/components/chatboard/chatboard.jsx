import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import { eventSliceActions } from 'redux/slices/eventSlice';

export default function chatboard() {
    const data = useLocation();
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.auth.user);
    const { _id } = useSelector(
        (state) => state.event.events.find((e) => e._id === data.state._id),
    );

    const leaveEvent = () => {
        dispatch(eventSliceActions.leaveEvent({ _id, email }));
        nagivate('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <Button onClick={leaveEvent}>Leave Event</Button>
            </Sidebar>
            <Box component="main">
                <h1>This is where the chatboard will be</h1>
                <h1>This is where the chatboard will be</h1>
                <h1>H1s slnfasljfnldjsfaksfnsdkfja</h1>
                <h1>H1s slnfasljfnldjsfaksfnsdkfja</h1>
            </Box>
        </Box>
    );
}
