import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { eventSliceActions } from 'redux/slices/eventSlice';
import { chatSliceActions } from 'redux/slices/chatSlice';
import './createEvent.css';

export default function CreateEventForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    function dispatchInput(e) {
        e.preventDefault();

        const body = new FormData(e.target);

        dispatch(eventSliceActions.createEvent({ body }))
            .then((eventRes) => {
                dispatch(chatSliceActions.createChat({ name: 'general', members: [] }))
                    .then((chatRes) => {
                        dispatch(
                            eventSliceActions.addChat(
                                { eventId: eventRes.payload._id, chatId: chatRes.payload._id },
                            ),
                        );
                    });
            });

        setName('');
        setDate('');
        setLocation('');
    }

    return (
        <div>
            <h1>New Event Form</h1>

            <form
              id="new_event"
              onSubmit={dispatchInput}
            >
                <div>
                    <label htmlFor="name">
                        Name
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="date ">
                        Date
                        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                </div>
                <br />
                <div>
                    <label htmlFor="location">
                        Location
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                    </label>
                </div>

                <br />
                <div>
                    <label htmlFor="eventPhoto">
                        Photo
                        <input type="file" accept="image/png" id="eventPhoto" name="eventPhoto" />
                    </label>
                </div>

                <br />
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import { authSliceActions } from 'redux/slices/authSlice';
// import { eventSliceActions } from 'redux/slices/eventSlice';
// import { chatSliceActions } from 'redux/slices/chatSlice';

// const theme = createTheme();

// export default function SignUp() {
//     const dispatch = useDispatch();
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);

//         const name = data.get('Name');
//         const date = data.get('Date');
//         const location = data.get('Location');
//         const pfp = data.get('ProfilePic');
//         console.log(name);
//         console.log(date);
//         console.log(Location);

//         dispatch(
//             eventSliceActions.createEvent({
//                 name,
//                 location,
//                 date,
//                 pfp,
//             }),
//         ).then((eventRes) => {
//             dispatch(
//                 chatSliceActions.createChat({ name: 'general', members: [] }),
//             ).then((chatRes) => {
//                 dispatch(
//                     eventSliceActions.addChat({
//                         eventId: eventRes.payload._id,
//                         chatId: chatRes.payload._id,
//                     }),
//                 );
//             });
//         });
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
//                         Create Event
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
//                               name="Name"
//                               required
//                               fullWidth
//                               id="Name"
//                               label="Name"
//                               autoFocus
//                             />
//                             <TextField
//                               required
//                               fullWidth
//                               id="Location"
//                               label="Location"
//                               name="Location"
//                               autoComplete="Location"
//                             />
//                             <TextField
//                               required
//                               fullWidth
//                               id="Date"
//                               label="Date yyyy/mm/dd"
//                               name="Date"
//                               autoComplete="Date"
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
//                                 Create Event
//                             </Button>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// }
