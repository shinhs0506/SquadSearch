import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Button, List, ListItem, ListItemText, Divider, Typography,
} from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import { eventSliceActions } from 'redux/slices/eventSlice';
import EventAPI from 'service/api/eventApi';

export default function chatboard() {
    const data = useLocation();
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.auth.user);
    const {
        _id, name, location, date,
    } = useSelector((state) => state.event.events.find((e) => e._id === data.state._id));

    const [profilePictures, setProfilePictures] = useState([]);

    useEffect(() => {
        EventAPI.getProfilePictures(_id).then((res) => {
            setProfilePictures(res.data);
        }).catch((err) => {
        });
    }, []);

    const leaveEvent = () => {
        dispatch(eventSliceActions.leaveEvent({ _id, email }));
        nagivate('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <List>
                    <ListItem>
                        <ListItemText primary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={location} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={date} />
                    </ListItem>
                </List>
                <Divider />
                <Typography>Joined Users</Typography>
                { profilePictures.map((pp, i) => {
                    const imageData = `data:image/png;base64,${pp}`;
                    return <img key={pp} width={50} src={imageData} alt="profile" />;
                })}
                <Divider />
                <Typography>Channels</Typography>
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
