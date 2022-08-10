import Sidebar from 'components/sidebars/sidebar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatAPI from 'service/api/chatApi';
import { Box } from '@mui/material';
import Chat from 'components/chat/chat';

export default function Messenger() {
    const user = useSelector((state) => state.auth.user);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    useEffect(() => {
        ChatAPI.getAllPrivateChats(user._id).then((res) => {
            setChats(res.data);
        }).catch((err) => {
        });
    }, []);

    function getRecipientUserId(name) {
        const index = name.indexOf(user._id);
        if (index === 0) {
            const userId = name.substr(24);
            return (userId);
        }
        const userId = name.substr(0, index);
        return (userId);
    }

    async function test(userId) {
        const a = await ChatAPI.getSenderInfo(userId);
        const { name } = a.data;
        return name;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <h2>Private Messages</h2>
                <div>
                    {chats?.map((chat) => (
                        <button
                          key={chat._id}
                          type="button"
                          onClick={() => {
                              setCurrentChat(chat);
                          }}
                        >
                            {getRecipientUserId(chat.name)}
                        </button>
                    ))}
                </div>
            </Sidebar>
            <Box component="main">
                <h1>This is where the chatboard will be</h1>
                {
                    currentChat
                        ? (
                            <Chat
                              chatId={currentChat._id}
                              name={currentChat.name}
                            />
                        )
                        : <p>Please select a chat</p>
                }
            </Box>
        </Box>
    );
}
