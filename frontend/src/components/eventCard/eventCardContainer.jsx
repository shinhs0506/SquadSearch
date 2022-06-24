import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from 'components/eventCard/eventCard';
import './eventCardContainer.css';

export default function EventCardContainer() {
    const events = useSelector((state) => state.event.events);

    return (
        <div className="container">
            { events.map((event) => (
                <EventCard
                  key={event.name + event.date}
                  name={event.name}
                  date={event.date}
                  location={event.location}
                />
            ))}
        </div>
    );
}
