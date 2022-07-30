import { Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './individualMessage.css';

export default function individualMessage() {
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const socket = socketIOClient('http://localhost:4000');
    const sendMessage = () => {
        socket.emit('send_message', { message });
    };
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageReceived([...messageReceived, data.message]);
            console.log(messageReceived);
        });
    }, [socket]);
    return (
        <div>
            <Toolbar />
            <div className="container">
                <input
                  placeholder="message in chat"
                  onChange={(event) => {
                      setMessage(event.target.value);
                  }}
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </div>
            <div>
                <ul>
                    {messageReceived.map((msg) => <li>{msg}</li>)}
                </ul>
            </div>
        </div>
    );
}
