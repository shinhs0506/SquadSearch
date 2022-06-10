import Searchbar from 'components/searchbar/searchbar'
import Navbar from 'components/navbar/navbar'
import AppRoutes from 'routes'
import NewEventForm from 'components/newEventForm/newEventForm';

import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Searchbar />
            <AppRoutes />
            <NewEventForm />
        </div>
  );
}

export default App;
