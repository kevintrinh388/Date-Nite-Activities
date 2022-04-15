import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RouteConstants from './constants/RouteConstants';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RouteConstants.Login} element={<Login />} />
        <Route path={RouteConstants.SignUp} element={<SignUp />} />
        <Route path={RouteConstants.Profile} element={<Profile />} />
        <Route path={RouteConstants.Home} element={<Home />} />
        <Route path={RouteConstants.Dashboard} element={<Dashboard />} />
        <Route path={RouteConstants.ContactUS} element={<ContactUs />} />
        <Route path={RouteConstants.Landing} element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
