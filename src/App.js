/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/home" element={<Home />}></Route>

      </Routes>
    </div>
  );
}

export default App;
