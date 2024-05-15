import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupForm from "./pages/SignUp";
import SignInForm from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} /> 
        <Route path="/login" Component={SignInForm} /> 
        <Route path="/register" Component={SignupForm} /> 
      </Routes>
    </Router>
  );
}

export default App;
