import React from 'react';
import { useSelector } from 'react-redux';
import './message.css';
import PropTypes from 'prop-types';

export default function Message(props) {
    const {
        _id, chatId, sender, text, createdAt,
    } = props;
    const user = useSelector((state) => state.auth.user);
    const imageData = `data:image/png;base64,${user.profilePicture}`;

    return (
        <div className="message">
            <div>
                <img src={imageData} alt="User pic" className="messagePic" />
            </div>
            <div>
                <div className="messageReceipt">
                    <p className="messageUsername">{sender}</p>
                    <p className="messageTimeStamp">{createdAt}</p>
                </div>
                <p className="messageText">{text}</p>
            </div>
        </div>
    );
}

Message.propTypes = {
    _id: PropTypes.string,
    chatId: PropTypes.string,
    sender: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.string,
};
