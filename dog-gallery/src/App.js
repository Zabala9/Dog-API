import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './Components/Gallery/Gallery';
import Main from './Components/MainPage/Main';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/gallery' element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
