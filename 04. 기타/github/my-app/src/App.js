// import logo from './logo.svg';
// import './App.css';
import React from "react";
import {Routes, Route, Link} from "react-router-dom";


import Home from "./pages/Home";
import About from "./pages/About";
import Counter from "./pages/Counter";


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>   
    </div>
  );
}

export default App;
