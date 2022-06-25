import React from 'react';
import { Box } from '@mui/material';

import Sidebar from 'components/sidebars/sidebar';
import IndividualMessage from 'components/messages/individualMessage';
import ContactsContainer from 'components/messages/contactsContainer';

export default function Messages() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2> Message Sidebar </h2>
            </Sidebar>
            <Box component="main">
                <ContactsContainer />
                <IndividualMessage />
            </Box>
        </Box>
    );
}
