import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, IconButton, Grid, Container, 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Sidebar from 'components/sidebars/sidebar';
import Searchbar from 'components/searchbar/searchbar';
import EventCardContainer from 'components/eventCard/eventCardContainer';
import MapWrapper from 'components/map/map';
import { ToggleSlider } from 'react-toggle-slider';

import './home.css';

function Home() {
    const user = useSelector((state) => state.auth.user);
    const [active, setActive] = useState(false);
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
                    {user.name}
                </Typography>
                <img width={100} src={user.profilePicture} alt="profile" />
                <Typography>{user.bio}</Typography>
                <Divider />
                <Typography>Upcoming Events</Typography>
                <List>
                    {myEvents.map((event, i) => {
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
                <div className="switch">
                    <h6>Switch To Map View</h6>
                <ToggleSlider onToggle={(state) => setActive(state)} />
                <Searchbar id="searchbar" />
                <IconButton color="primary">
                    <Link
                      to="/create-event"
                    >
                        <AddCircleOutlineIcon fontSize="large" />
                    </Link>
                </IconButton>
                <EventCardContainer />
                <div id="map">
                    <MapWrapper />
                </div>

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container direction="column" align="center">
                        <Box>
                            <Searchbar />
                        </Box>
                        {active ? (
                            <div id="map">
                                <MapWrapper />
                            </div>
                        ) : (
                            <EventCardContainer />
                        )}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;
