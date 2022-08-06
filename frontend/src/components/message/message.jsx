import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './message.css';
import PropTypes from 'prop-types';
import ChatAPI from 'service/api/chatApi';

export default function Message(props) {
    const {
        sender, text, createdAt,
    } = props;

    const [user, setUser] = useState();

    useEffect(() => {
        ChatAPI.getSenderInfo(sender).then((res) => {
            setUser(res.data);
        }).catch((err) => {
        });
    }, [sender]);
    return (
        <div className="message">
            <div>
                <img src={user?.profilePicture} alt="User pic" className="messagePic" />
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
