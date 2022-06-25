import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home/home';
import Message from 'pages/message/message';
import SignUp from 'pages/signUp/signUp';
import CreateEvent from 'pages/createEvent/createEvent';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Routes>
    );
}

export default AppRoutes;
