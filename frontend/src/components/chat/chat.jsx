import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { chatSliceActions } from 'redux/slices/chatSlice';
import Message from 'components/message/message';
import socketIOClient from 'socket.io-client';
import './chat.css';

export default function Chat(props) {
    const {
        chatId, name,
    } = props;
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const chats = useSelector((state) => state.chat.chats);

    const currentChat = chats.find((chat) => (chat._id === chatId));

    const [msgCount, setMsgCount] = useState(0);

    useEffect(() => {
        dispatch(chatSliceActions.getAllChats());
        dispatch(chatSliceActions.getAllMessages(chatId));
    }, [chatId, msgCount]);

    const [message, setMessage] = useState('');

    const socket = socketIOClient('http://localhost:4000');
    socket.emit('join_room', chatId);

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
        // dispatch(chatSliceActions.getAllMessages);
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
                                        <input
                                          placeholder="message in chat"
                                          onChange={(event) => {
                                              setMessage(event.target.value);
                                          }}
                                        />
                                        <input
                                          type="submit"
                                          value="Send"
                                        />
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
