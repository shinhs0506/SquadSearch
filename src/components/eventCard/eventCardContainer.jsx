import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from 'components/eventCard/eventCard';
import './eventCardContainer.css';

export default function EventCardContainer() {
    const curr = useSelector((state) => state.event.events);
    const elements = curr.map((event) => (
        // TODO: change key value to id of events
        <EventCard
          key={event.Name + event.Date}
          name={event.Name}
          date={event.Date}
          location={event.Location}
        />
    ));
    return (
        <div className="container">
            <EventCard
              img="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952"
              name="Ariana Grande"
              date="2022-06-23"
              location="Rogers Arena"
            />
            {elements}
        </div>
    );
}
