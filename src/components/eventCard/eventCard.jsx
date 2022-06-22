import React from 'react';
import PropTypes from 'prop-types';

import './eventCard.css';
// https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952
//
function Searchbar(props) {
    const { src } = props;
    const { name } = props;
    const { date } = props;
    const { location } = props;

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
                    <button type="button" href="#">Join Now</button>
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
