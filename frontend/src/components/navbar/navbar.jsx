import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { useLogout } from 'service/authService';

function Navbar() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const logout = useLogout();

    const handleLogout = () => {
        logout();
    };

    if (isLoggedIn) {
        return (
            <div>
                <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography>SquardSearch</Typography>
                        <Typography>
                            <Link to="/"> Home </Link>
                        </Typography>
                        <Typography>
                            <Link to="/create-event"> Create Event </Link>
                        </Typography>
                        <Typography>
                            <Link to="/edit-profile"> Edit Profile </Link>
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}> Log out </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    return null;
}

export default Navbar;
