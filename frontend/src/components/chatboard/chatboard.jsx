import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
    Box, Button, List, ListItem, ListItemText, Divider, Typography, ImageListItem,
} from '@mui/material';
import Sidebar from 'components/sidebars/sidebar';
import { eventSliceActions } from 'redux/slices/eventSlice';
import EventAPI from 'service/api/eventApi';
import ChatAPI from 'service/api/chatApi';
import './chatboard.css';
import Chat from 'components/chat/chat';

export default function chatboard() {
    const data = useLocation();
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.auth.user);
    const {
        _id, name, location, date, joinedUsers,
    } = useSelector((state) => state.event.events.find((e) => e._id === data.state._id));

    const detailedProfile = useSelector((state) => state.user.detailedProfile);
    const user = useSelector((state) => state.auth.user);
    const [profilePictures, setProfilePictures] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const [channelName, setChannelName] = useState('');

    useEffect(() => {
        EventAPI.getProfilePictures(_id).then((res) => {
            setProfilePictures(res.data);
        }).catch((err) => {
        });
    }, []);

    useEffect(() => {
        EventAPI.getAllChats(_id).then((res) => {
            setChats(res.data);
        }).catch((err) => {
        });
    }, []);

    const leaveEvent = () => {
        dispatch(eventSliceActions.leaveEvent({ _id, email }));
        nagivate('/');
    };

    function addChannel(e) {
        e.preventDefault();
        ChatAPI.createChat(channelName, joinedUsers).then((res) => {
            const chatId = res.data._id;
            dispatch(eventSliceActions.addChat({ eventId: _id, chatId }));
            EventAPI.getAllChats(_id).then((eventRes) => {
                setChats(eventRes.data);
            });
        });
        setChannelName('');
    }

    async function startPrivateChat() {
        const userId = user._id;
        const addId = detailedProfile._id;
        await ChatAPI.createChat(userId.concat(addId), [user._id, detailedProfile._id]);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar>
                <List>
                    <ListItem>
                        <ListItemText primary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={location} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={date} />
                    </ListItem>
                </List>
                <Divider />
                <Typography>Joined Users</Typography>
                <div id="profile-picture-box">
                    { profilePictures.map((pp, i) => {
                        const src = `data:image/png;base64,${pp}`;
                        return <img key={pp} width={50} src={src} alt="profile" />;
                    })}
                </div>
                <Divider />
                <Typography>Channels</Typography>
                <div>
                    {chats.map((chat) => (
                        <div>
                            <Button
                              key={chat._id}
                              type="button"
                              variant="text"
                              onClick={() => {
                                  setCurrentChat(chat);
                              }}
                            >
                                {chat.name}
                            </Button>
                        </div>
                    ))}
                </div>
                <form onSubmit={addChannel}>
                    <input placeholder="name" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
                    <button type="submit">add</button>
                </form>
                <Button onClick={leaveEvent}>Leave Event</Button>

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
                        : <p>Please select a channel</p>
                }
            </Box>
            <Box>
                {
                    detailedProfile.name
                        ? (
                            <List>
                                <ListItem>
                                    <ListItemText primary={name} />
                                </ListItem>
                                <ListItem>
                                    <ImageListItem key={detailedProfile?.profilePicture}>
                                        <img src={detailedProfile?.profilePicture} alt="User pic" />
                                    </ImageListItem>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={detailedProfile?.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={detailedProfile?.bio} />
                                </ListItem>
                                <Link to="/messenger">
                                    <button type="button" onClick={startPrivateChat}>Start new chat</button>
                                </Link>
                            </List>
                        )
                        : <div />
                }
            </Box>
        </Box>
    );
}
