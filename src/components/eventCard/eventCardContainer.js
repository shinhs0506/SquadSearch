import EventCard from "./eventCard.js";
import Store from "../../redux/store";
import React from "react";
import "./eventCardContainer.css";
import { useSelector } from "react-redux";

export default function EventCardContainer(props) {
  const curr = useSelector((state) => state.newEvent.events);
  const elements = curr.map((event, i) => {
    i++;
    return (
      <EventCard
        key={i.toString()}
        name={event.Name}
        date={event.Date}
        location={event.Location}
      />
    );
  });
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
