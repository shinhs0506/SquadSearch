import Searchbar from "components/searchbar/searchbar";
import Navbar from "components/navbar/navbar";
import AppRoutes from "routes";
import EventCard from "./components/eventCard/eventCard.js";
import NewEventForm from "components/newEventForm/newEventForm";
import EventCardContainer from "./components/eventCard/eventCardContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbar />
      <AppRoutes />
      <NewEventForm />
      <EventCardContainer />
    </div>
  );
}

export default App;
