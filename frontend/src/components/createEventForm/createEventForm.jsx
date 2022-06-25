import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "redux/slices/eventSlice";

// TODO: Maybe look into redux form

export default function CreateEventForm() {
  const eventName = useRef();
  const eventDate = useRef();
  const eventLocation = useRef();
  const dispatch = useDispatch();

  function dispatchInput() {
    const inputName = eventName.current.value;
    const inputDate = eventDate.current.value;
    const inputLocation = eventLocation.current.value;
    dispatch(
      createEvent({ name: inputName, date: inputDate, location: inputLocation })
    );
  }

  function resetForm() {
    eventName.current.value = "";
    eventDate.current.value = "";
    eventLocation.current.value = "";
  }

  return (
    <div>
      <h1>New Event Form</h1>

      <form
        id="new_event"
        onSubmit={(event) => {
          event.preventDefault();
          dispatchInput();
          resetForm();
        }}
      >
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" ref={eventName} />
        </label>
        <br />
        <label htmlFor="date ">
          Date
          <input type="date" id="date" name="date" ref={eventDate} />
        </label>
        <br />
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            ref={eventLocation}
          />
        </label>
        <br />
        <input type="submit" value="Submit" id="submitButton" />
      </form>
    </div>
  );
}
