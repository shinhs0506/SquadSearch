import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chatSliceActions } from 'redux/slices/chatSlice';
import { messageSliceActions } from 'redux/slices/messageSlice';
import Message from 'components/message/message';

import socketIOClient from 'socket.io-client';
import './chat.css';

export default function ChatContainer() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(chatSliceActions.getAllChatsWithUser(user._id));
    }, [user._id]);

    const chats = useSelector((state) => state.chat.chats);
    const messages = useSelector((state) => state.message.messages);

    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        dispatch(messageSliceActions.getMessagesByChatId(currentChat?._id));
    }, [currentChat]);

    const chatInput = useRef();
    const socket = socketIOClient('http://localhost:4000');
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            dispatch(messageSliceActions.createMessage({
                chatId: data.room,
                sender: data.sender,
                text: data.message,
            }));
            // setMessageReceived([...messageReceived, data]);
            // console.log(messageReceived);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('test', (data) => {
            console.log('test');
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit('send_message', { room: currentChat._id, sender: user.name, message });
    };

    return (
        <div className="chatContainer">
            {/*
            <button
              type="submit"
              onClick={(event) => {
                  dispatch(
                    chatSliceActions.createChat({ name: 'happy', members: [user._id, 'xyz321'] }));
              }}
            >
                Test
            </button> */}
            <h1>TESTING</h1>
            {chats.map((chat) => (
                <button
                  type="submit"
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
                                    {messages.map((m) => (
                                        <Message
                                          _id={m._id}
                                          chatId={m.chatId}
                                          sender={m.sender}
                                          text={m.text}
                                          createdAt={m.createdAt}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {/* <textarea className="chatInput" ref={chatInput} /> */ }
                                    <input
                                      placeholder="message in chat"
                                      onChange={(event) => {
                                          setMessage(event.target.value);
                                      }}
                                    />
                                    <button
                                      type="submit"
                                      onClick={() => {
                                          sendMessage();
                                      }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )
                        : <p>Open a chat</p>
                }
        </div>
    );
}
