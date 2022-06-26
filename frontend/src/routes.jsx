import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home/home';
import Message from 'pages/message/message';
import SignUp from 'pages/signUp/signUp';
import CreateEvent from 'pages/createEvent/createEvent';
import Chatboard from 'pages/chatboard/chatboard';
import EditProfile from 'pages/editProfile/editProfile';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/chatboard" element={<Chatboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
    );
}

export default AppRoutes;
