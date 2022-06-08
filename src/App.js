import Searchbar from 'components/searchbar/searchbar'
import Navbar from 'components/navbar/navbar'
import AppRoutes from 'routes'

import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Searchbar />
            <AppRoutes />
        </div>
  );
}

export default App;
