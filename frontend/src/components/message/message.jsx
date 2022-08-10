import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './message.css';
import PropTypes from 'prop-types';
import ChatAPI from 'service/api/chatApi';
import { userSliceActions } from 'redux/slices/userSlice';

export default function Message(props) {
    const {
        sender, text, createdAt,
    } = props;

    const [user, setUser] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        ChatAPI.getSenderInfo(sender).then((res) => {
            setUser(res.data);
        }).catch((err) => {
        });
    }, [sender]);

    const profileDisplay = () => {
        const userId = user._id;
        dispatch(userSliceActions.getProfile(userId));
    };

    return (
        <div className="message">
            <div>
                <button type="button" className="messagePic" id="profileButton" onClick={profileDisplay}>
                    <img src={user?.profilePicture} alt="User pic" className="messagePic" />
                </button>
            </div>
            <div>
                <div className="messageReceipt">
                    <p className="messageUsername">{user?.name}</p>
                    <p className="messageTimeStamp">{createdAt}</p>
                </div>
                <p className="messageText">{text}</p>
            </div>
        </div>
    );
}

Message.propTypes = {
    sender: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.string,
};
