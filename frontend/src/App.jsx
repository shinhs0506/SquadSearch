import React from 'react';
import Navbar from 'components/navbar/navbar';
import AppRoutes from 'routes';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div>
                <AppRoutes />
            </div>
        </div>
    );
}

export default App;
