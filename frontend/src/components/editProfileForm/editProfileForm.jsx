import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authSliceActions } from 'redux/slices/authSlice';

export default function EditProfileForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);

    function dispatchInput(e) {
        e.preventDefault();

        const body = new FormData(e.target);

        dispatch(authSliceActions.updateUser({ body }));
    }

    return (
        <div>
            <h1 id="title">Edit Profile</h1>
            <form id="new_profile" onSubmit={dispatchInput}>
                <div className="input-container ic1">
                    <label htmlFor="name">
                        Username
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          minLength="10"
                          maxLength="20"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="password">
                        Password
                        <input type="password" id="password" name="password" />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="confirm_password">
                        Confirm Password
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="profilePicture">
                        Profile Picture
                        <input
                          type="file"
                          accept="image/png"
                          id="profilePicture"
                          name="profilePicture"
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="bio">
                        Bio
                        <textarea
                          id="bio"
                          name="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows="4"
                          cols="30"
                        />
                    </label>
                </div>

                <br />
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import { authSliceActions } from 'redux/slices/authSlice';

// const theme = createTheme();

// export default function SignUp() {
//     const dispatch = useDispatch();
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);

//         const name = data.get('firstName');
//         const password = data.get('password');
//         const email = data.get('email');
//         const bio = data.get('Bio');
//         const pfp = data.get('ProfilePic');

//         dispatch(authSliceActions.updateUser({
//             name,
//             email,
//             password,
//             bio,
//             pfp,
//         }));
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                   sx={{
//                       marginTop: 8,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                   }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Edit Profile
//                     </Typography>
//                     <Box
//                       component="form"
//                       noValidate
//                       onSubmit={handleSubmit}
//                       sx={{ mt: 3 }}
//                     >
//                         <Grid container spacing={2}>
//                             {/* <Grid item xs={12}>/ */}
//                             <TextField
//                               autoComplete="given-name"
//                               name="firstName"
//                               required
//                               fullWidth
//                               id="firstName"
//                               label="Username"
//                               autoFocus
//                             />
//                             <TextField
//                               required
//                               fullWidth
//                               id="email"
//                               label="Email Address"
//                               name="email"
//                               autoComplete="email"
//                             />
//                             <TextField
//                               required
//                               fullWidth
//                               name="password"
//                               label="Password"
//                               type="password"
//                               id="password"
//                               autoComplete="new-password"
//                             />
//                             <TextField
//                               fullWidth
//                               name="Bio"
//                               label="Bio"
//                               type="text"
//                               id="Bio"
//                               autoComplete="Bio"
//                             />
//                             <TextField
//                               fullWidth
//                               name="ProfilePic"
//                               label="ProfilePic"
//                               type="file"
//                               id="ProfilePic"
//                               autoComplete="ProfilePic"
//                             />
//                             <Button
//                               type="submit"
//                               fullWidth
//                               variant="contained"
//                               sx={{ mt: 3, mb: 2 }}
//                             >
//                                 Update Profile
//                             </Button>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// }
