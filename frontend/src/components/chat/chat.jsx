import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { chatSliceActions } from 'redux/slices/chatSlice';
import Message from 'components/message/message';
import socketIOClient from 'socket.io-client';
import './chat.css';
import { TextField, Button, Input } from '@mui/material';

export default function Chat(props) {
    const {
        chatId, name,
    } = props;

    const socketURL = (process.env.NODE_ENV || 'development') === 'development'
        ? 'http://localhost:4000'
        : 'https://cpsc455-squadsearch-backend.herokuapp.com/';
    const socket = socketIOClient(socketURL);
    socket.emit('join_room', chatId);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const chats = useSelector((state) => state.chat.chats);

    const currentChat = chats.find((chat) => (chat._id === chatId));
    const [msgCount, setMsgCount] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(chatSliceActions.getAllChats());
        dispatch(chatSliceActions.getAllMessages(chatId));
    }, [chatId, msgCount]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMsgCount((c) => c + 1);
            dispatch(chatSliceActions.getAllMessages(chatId));
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit('send_message', { room: currentChat._id, sender: user._id, message });
        dispatch(chatSliceActions.createMessage({
            chatId: currentChat._id,
            sender: user._id,
            text: message,
        }));
    };

    function submitMessage(e) {
        e.preventDefault();
        e.target.reset();
        sendMessage();
    }
    return (
        <div className="chatContainer">
            {
                    currentChat
                        ? (
                            <>
                                <div className="chatMessages">
                                    {chats.find((chat) => (
                                        chat._id === chatId
                                    )).messages.map((msg) => (
                                        <Message
                                          key={msg.id}
                                          sender={msg.sender}
                                          text={msg.text}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <form onSubmit={submitMessage}>
                                        <TextField
                                          placeholder="message in chat"
                                          onChange={(event) => {
                                              setMessage(event.target.value);
                                          }}
                                        />
                                        <Button
                                          type="submit"
                                          value="Send"
                                        >
                                            Send
                                        </Button>
                                    </form>
                                </div>
                            </>
                        )
                        : <p>Please select a channel</p>
                }
        </div>
    );
}

Chat.propTypes = {
    chatId: PropTypes.string,
    name: PropTypes.string,
};
