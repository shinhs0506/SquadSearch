import React from 'react';
import IndividualMessage from 'components/messages/individualMessage';
import ContactsContainer from 'components/messages/contactsContainer';

export default function Messages() {
    return (
        <div>
            <ContactsContainer />
            <IndividualMessage />
        </div>
    );
}
