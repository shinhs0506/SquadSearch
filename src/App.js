
import Searchbar from "components/searchbar/searchbar";
import Navbar from "components/navbar/navbar";
import AppRoutes from "routes";
import EventCard from "./components/eventCard/eventCard.js";
import NewEventForm from 'components/newEventForm/newEventForm';

import "./App.css";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Searchbar />
            <AppRoutes />
            <NewEventForm />
            <EventCard
                img="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952"
                date="Oct 9 2022"
                location="Rogers Arena"
              />
        </div>
  );
}

export default App;
