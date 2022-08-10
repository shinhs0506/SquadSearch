import React from 'react';
import {
    Routes, Route, Outlet, Navigate, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Banner from 'components/banner/banner';
import Home from 'pages/home/home';
import Chat from 'pages/chat/chat';
import Login from 'pages/auth/login';
import Logout from 'pages/auth/logout';
import SignUp from 'pages/auth/signUp';
import CreateEvent from 'pages/createEvent/createEvent';
import Chatboard from 'components/chatboard/chatboard';
import Messenger from 'components/messenger/messenger';
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
            {/* <Toolbar /> */}
            <Banner />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route element={<Guard />}>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/chatboard" element={<Chatboard />} />
                    <Route path="/messenger" element={<Messenger />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;
