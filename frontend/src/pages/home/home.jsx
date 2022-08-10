import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import Searchbar from 'components/searchbar/searchbar';
import EventCardContainer from 'components/eventCard/eventCardContainer';
import MapWrapper from 'components/map/map';

import './home.css';

function Home() {
    const user = useSelector((state) => state.auth.user);
    const myEvents = useSelector(
        (state) => state.event.events.filter(
            (event) => event.joinedUsers.includes(user._id),
        ),
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <Typography>
                    Hello
                    {' '}
                    { user.name }
                </Typography>
                <img width={100} src={user.profilePicture} alt="profile" />
                <Typography>
                    { user.bio }
                </Typography>
                <Divider />
                <Typography>
                    Upcoming Events
                </Typography>
                <List>
                    { myEvents.map((event, i) => {
                        const { _id, name } = event;
                        return (
                            <ListItem key={name}>
                                <ListItemButton>
                                    <Link
                                      to="/chatboard"
                                      state={{ _id }}
                                      style={{ textDecoration: 'none' }}
                                    >
                                        <ListItemText primary={name} />
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

            </Sidebar>
            <Box component="main">
                <h1>Home</h1>
                <Searchbar />
                <EventCardContainer />
                <div id="map">
                    <MapWrapper />
                </div>
            </Box>
        </Box>
    );
}

export default Home;
