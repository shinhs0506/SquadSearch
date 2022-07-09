import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Home from 'pages/home/home';
import Message from 'pages/message/message';
import Login from 'pages/login/login';
import SignUp from 'pages/signUp/signUp';
import CreateEvent from 'pages/createEvent/createEvent';
import Chatboard from 'pages/chatboard/chatboard';
import EditProfile from 'pages/editProfile/editProfile';
import { Toolbar } from '@mui/material';

function Guard(props) {
    const { routeRedirect } = props
    const location = useLocation();

    return false
        ? <Outlet />
        : <Navigate to={routeRedirect} replace state={{ from: location }} />
}

function AppRoutes() {
    return (
        <>
        <Toolbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route element={<Guard routeRedirect="/login" />} >
                <Route path="/" element={<Home />} />
                <Route path="/message" element={<Message />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/chatboard" element={<Chatboard />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </ Route>
        </ Routes>
        </>
    );
}

export default AppRoutes;
