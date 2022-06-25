import React from 'react';
import { Drawer, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';

import { sidebarWidth } from 'constants/sidebar';

function Sidebar(props) {
    const { children } = props;

    return (
        <Drawer
          variant="permanent"
          sx={{
              width: sidebarWidth,
              flexShrink: 0,
              // eslint-disable-next-line
              [`& .MuiDrawer-paper`]: { width: sidebarWidth, boxSizing: 'border-box' },
          }}
        >
            <Toolbar />
            {children}
        </Drawer>
    );
}

Sidebar.propTypes = {
    children: PropTypes.node,
};

export default Sidebar;
