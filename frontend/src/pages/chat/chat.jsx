import React from 'react';
import { Box } from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import ChatContainer from 'components/chat/chat';

export default function Messages() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2> Message Sidebar </h2>
            </Sidebar>
            <Box component="main">
                <ChatContainer />
            </Box>
        </Box>
    );
}
