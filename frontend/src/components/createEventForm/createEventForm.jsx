import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { eventSliceActions } from 'redux/slices/eventSlice';
import { chatSliceActions } from 'redux/slices/chatSlice';
// TODO: Maybe look into redux form

export default function CreateEventForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    function dispatchInput(e) {
        e.preventDefault();

        const body = new FormData(e.target);

        dispatch(eventSliceActions.createEvent({ body }))
            .then((eventRes) => {
                dispatch(chatSliceActions.createChat({ name: 'general', members: [] }))
                    .then((chatRes) => {
                        dispatch(
                            eventSliceActions.addChat(
                                { eventId: eventRes.payload._id, chatId: chatRes.payload._id },
                            ),
                        );
                    });
            });

        setName('');
        setDate('');
        setLocation('');
    }

    return (
        <div>
            <h1>New Event Form</h1>

            <form
              id="new_event"
              onSubmit={dispatchInput}
            >
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label htmlFor="date ">
                    Date
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <br />
                <label htmlFor="location">
                    Location
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="eventPhoto">
                    Photo
                    <input type="file" accept="image/png" id="eventPhoto" name="eventPhoto" />
                </label>
                <br />
                <input type="submit" value="Submit" id="submitButton" />
            </form>
        </div>
    );
}
