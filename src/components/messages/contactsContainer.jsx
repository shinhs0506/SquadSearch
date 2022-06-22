import React from 'react';
import Contact from 'components/messages/contact';

export default function contactsContainter() {
    return (
        <div className="container">
            <Contact
              name="Isaac"
              img="https://fitnessvolt.com/wp-content/uploads/2021/03/chris-bumstead-750x393.jpg"
            />
            <Contact
              name="Anthony"
              img="https://imageio.forbes.com/blogs-images/rainerzitelmann/files/2019/05/GettyImages-481406443-1200x1785.jpg?format=jpg&width=960"
            />
            <Contact
              name="John"
              img="https://generationiron.com/wp-content/uploads/2019/08/new-ifbb-pro-league-qualifications-for-the-2020-olmypia-header.jpg"
            />
        </div>
    );
}
