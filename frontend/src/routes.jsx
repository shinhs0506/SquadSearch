import React from 'react';
import {
    Routes, Route, Outlet, Navigate, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toolbar } from '@mui/material';

import Home from 'pages/home/home';
import Message from 'pages/message/message';
import Login from 'pages/auth/login';
import Logout from 'pages/auth/logout';
import SignUp from 'pages/auth/signUp';
import CreateEvent from 'pages/createEvent/createEvent';
import Chatboard from 'pages/chatboard/chatboard';
import EditProfile from 'pages/editProfile/editProfile';

function Guard() {
    const location = useLocation();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn
        ? <Outlet />
        : <Navigate to="/login" replace state={{ from: location }} />;
}

function AppRoutes() {
    return (
        <>
            <Toolbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route element={<Guard />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/chatboard" element={<Chatboard />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;
