import React from 'react';
import Navbar from 'components/navbar/navbar';
import AppRoutes from 'routes';
import { useCheckLogin } from 'service/authService';
import './App.css';

function App() {
    useCheckLogin();

    return (
        <div className="App">
            <Navbar />
            {/* <div> */}
            <AppRoutes />
            {/* </div> */}
        </div>
    );
}

export default App;
