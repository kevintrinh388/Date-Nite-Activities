import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import RouteConstants from './constants/RouteConstants';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RouteConstants.Landing} element={<Landing />} />
        <Route path={RouteConstants.Profile} element={<Profile />} />
        <Route path={RouteConstants.Home} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
