import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { eventSliceActions } from 'redux/slices/eventSlice';
import { chatSliceActions } from 'redux/slices/chatSlice';
import { Link } from 'react-router-dom';

import './eventCard.css';
// https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952

function EventCard(props) {
    const {
        _id, name, location, date, src, chats,
    } = props;
    const { email } = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    function handleJoin() {
        dispatch(eventSliceActions.joinEvent({ _id, email }));
        dispatch(chatSliceActions.joinChats({ _id, email }));
    }

    function handleDelete() {
        chats.forEach((chatId) => {
            dispatch(chatSliceActions.deleteChat({ chatId }));
        });
        dispatch(eventSliceActions.deleteEventByID({ _id }));
    }

    return (
        <div className="container">
            <div className="card">
                <div className="imgBx">
                    { src
                        ? <img src={src} alt="event" />
                        : <img src="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952" alt="event" />}
                </div>
                <div className="contentBx">
                    <h2 className="name">{name}</h2>
                    <div className="date">
                        <h3>Date : </h3>
                        <span>{date}</span>
                    </div>
                    <div className="location">
                        <h3>Location :</h3>
                        <span>{location}</span>
                    </div>
                    <Link
                      to="/chatboard"
                      state={{ _id }}
                    >
                        <button type="button" onClick={handleJoin}>Join Now</button>
                    </Link>

                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    src: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    chats: PropTypes.arrayOf(PropTypes.string),
};

export default EventCard;
