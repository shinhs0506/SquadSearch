import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useGetEvents from 'service/eventService';
import EventCard from 'components/eventCard/eventCard';
import './eventCardContainer.css';

/* eslint-disable no-alert, no-console */
export default function EventCardContainer() {
    const getAllEvents = useGetEvents();
    useEffect(() => {
        getAllEvents();
    }, []);

    const events = useSelector((state) => state.event.events);

    return (
        <div className="container">
            {events.map((event) => (
                <EventCard
                  key={event._id}
                  _id={event._id}
                  name={event.name}
                  date={event.date}
                  location={event.location}
                />
            ))}
        </div>
    );
}
