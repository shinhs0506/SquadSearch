import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { eventSliceActions } from 'redux/slices/eventSlice';
import { Link } from 'react-router-dom';

import './eventCard.css';
// https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952

function EventCard(props) {
    const {
        _id, name, location, date, src,
    } = props;
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(eventSliceActions.deleteEventByID({ _id }));
    }

    return (
        <div className="container">
            <div className="card">
                <div className="imgBx">
                    <img src={'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952'
                    } alt="event" />
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
                    <Link to="/chatboard">
                        <button type="button">Join Now</button>
                    </Link>

                    <button
                        type="button"
                        onClick={handleDelete}
                    >
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
};

export default EventCard;
