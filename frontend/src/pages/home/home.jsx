import React from 'react';
import { Box } from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import Searchbar from 'components/searchbar/searchbar';
import EventCardContainer from 'components/eventCard/eventCardContainer';

function Home() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2>Home Sidebar</h2>
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
