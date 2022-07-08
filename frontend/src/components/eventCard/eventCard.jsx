import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteEvents } from 'redux/slices/eventSlice';
import { Link } from 'react-router-dom';

import './eventCard.css';
// https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952
//
/* eslint-disable no-alert, no-console */
function Searchbar(props) {
    const { src } = props;
    const { name } = props;
    const { date } = props;
    const { location } = props;
    const dispatch = useDispatch();

    function dispatchInput() {
        const inputName = name;
        const inputDate = date;
        const inputLocation = location;
        dispatch(
            deleteEvents({
                Name: inputName,
                Date: inputDate,
                Location: inputLocation,
            }),
        );
    }

    return (
        <div className="container">
            <div className="card">
                <div className="imgBx">
                    <img src={src} alt="event" />
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
                      onClick={() => {
                          dispatchInput();
                      }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

Searchbar.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
};

export default Searchbar;
