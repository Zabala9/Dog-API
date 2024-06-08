import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './Components/Gallery';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
