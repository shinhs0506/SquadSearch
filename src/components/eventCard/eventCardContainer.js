import EventCard from "./eventCard.js";
import Store from "../../redux/store";
import React from "react";
import "./eventCardContainer.css";

export default function EventCardContainer(props) {
  const [events, setEvents] = React.useState([]);
  Store.subscribe(() => {
    // console.log("hi");
    let curr = Store.getState().newEvent.events;
    // console.log(curr);
    let i = 0;
    const elements = curr.map((event) => {
      let j = i;
      i++;
      return (
        <EventCard
          key={j.toString()}
          name={event.Name}
          date={event.Date}
          location={event.Location}
        />
      );
    });
    setEvents(elements);
    return <div className="card-container">{elements}</div>;
  });
  return (
    <div className="container">
      <EventCard
        img="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952"
        name="Ariana Grande"
        date="2022-06-23"
        location="Rogers Arena"
      />
      {events}
    </div>
  );
}
