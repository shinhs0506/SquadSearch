import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

                        <Grid
                          container
                          direction="row"
                          style={{ gap: 15 }}
                          align="center"
                        >
                            <Box>
                                <Typography>SquadSearch</Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        {' '}
                                        Home
                                        {' '}
                                    </Link>
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    <Link
                                      to="/create-event"
                                      style={{ textDecoration: 'none' }}
                                    >
                                        {' '}
                                        Create Event
                                        {' '}
                                    </Link>
                                </Typography>
                            </Box>

                            <Box>
                                <Typography>
                                    <Link
                                      to="/edit-profile"
                                      style={{ textDecoration: 'none' }}
                                    >
                                        {' '}
                                        Edit Profile
                                        {' '}
                                    </Link>
                                </Typography>
                            </Box>
                        </Grid>

                        <Button color="inherit" onClick={handleLogout}>
                            {' '}
                            Log out
                            {' '}
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    return null;
}

export default Navbar;
