import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Box, Typography, Divider, List, ListItem, ListItemButton,
} from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import Searchbar from 'components/searchbar/searchbar';
import EventCardContainer from 'components/eventCard/eventCardContainer';

function Home() {
    const user = useSelector((state) => state.auth.user);
    const imageData = `data:image/png;base64,${user.profilePicture}`;
    const myEvents = useSelector(
        (state) => state.event.events.filter(
            (event) => event.joinedUsers.includes(user._id),
        ),
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2>Home Sidebar</h2>
                <Typography>
                    Hello
                    {' '}
                    { user.name }
                </Typography>
                <img width={100} src={imageData} alt="profile" />
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
                                    >
                                        { name }
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
            </Box>
        </Box>
    );
}

export default Home;
