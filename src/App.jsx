import React from 'react';
import Searchbar from 'components/searchbar/searchbar';
import Navbar from 'components/navbar/navbar';
import AppRoutes from 'routes';
import NewEventForm from 'components/newEventForm/newEventForm';
import EventCardContainer from 'components/eventCard/eventCardContainer';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>hi</h1>
            <Navbar />
            <AppRoutes />
            <Searchbar />
            <NewEventForm />
            <EventCardContainer />
        </div>
    );
}

export default App;
