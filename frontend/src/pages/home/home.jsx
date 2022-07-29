import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import Searchbar from 'components/searchbar/searchbar';
import EventCardContainer from 'components/eventCard/eventCardContainer';

function Home() {
    const user = useSelector((state) => state.auth.user);
    const imageData = `data:image/png;base64,${user.profilePicture}`;

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2>Home Sidebar</h2>
                <p>
                    Hello
                    { user.name }
                </p>
                <img width={100} src={imageData} alt="profile" />
                <p>
                    { user.bio }
                    {' '}
                </p>
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
