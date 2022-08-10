import React from 'react';
import CreateEventForm from 'components/createEventForm/createEventForm';

import Navbar from 'components/navbar/navbar';


function CreateEvent() {
    return (
        <div>
            <Navbar />
            <CreateEventForm />
        </div>
    );
}

export default CreateEvent;
