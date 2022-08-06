import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chatSliceActions } from 'redux/slices/chatSlice';
import Message from 'components/message/message';

import socketIOClient from 'socket.io-client';
import './chat.css';
import ChatAPI from 'service/api/chatApi';

export default function ChatContainer() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(chatSliceActions.getAllChatsWithUser(user._id));
    }, [user._id]);

    const chats = useSelector((state) => state.chat.chats);

    const [currentChat, setCurrentChat] = useState(null);

    const [msgCount, setMsgCount] = useState(0);

    useEffect(() => {
        dispatch(chatSliceActions.getAllMessages(currentChat?._id));
    }, [msgCount]);

    useEffect(() => {
        dispatch(chatSliceActions.getAllMessages(currentChat?._id));
    }, [currentChat]);

    const [message, setMessage] = useState('');

    const socket = socketIOClient('http://localhost:4000');

    useEffect(() => {
        socket.on('receive_message', (data) => {
            ChatAPI.getAllMessages(data.room).then(() => {
                setMsgCount((c) => c + 1);
            });
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit('send_message', { room: currentChat._id, sender: user._id, message });
        dispatch(chatSliceActions.createMessage({
            chatId: currentChat._id,
            sender: user._id,
            text: message,
        }));
        dispatch(chatSliceActions.getAllMessages);
    };

    function submitMessage(e) {
        e.preventDefault();
        e.target.reset();
        sendMessage();
    }

    return (
        <div className="chatContainer">
            <h1>TESTING</h1>
            {chats.map((chat) => (
                <button
                  key={chat._id}
                  type="button"
                  onClick={() => {
                      setCurrentChat(chat);
                      socket.emit('join_room', chat._id);
                  }}
                  onKeyDown={() => setCurrentChat(chat)}
                >
                    <h1>{chat.name}</h1>
                </button>
            ))}
            {
                    currentChat
                        ? (
                            <>
                                <div className="chatMessages">
                                    {chats.find((chat) => (
                                        chat._id === currentChat._id
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
                        : <p>Open a chat</p>
                }
        </div>
    );
}
