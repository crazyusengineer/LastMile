import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Signin from './pages/signin';
import History from './pages/history';
import Mapper from './pages/map';
import Contact from './pages/contact';

import axios from "axios";
import "./index.css";

function App() {
  // React States
  

  return (<>
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/history' element={<History/>} />
        <Route path='/map' element={<Mapper/>} />
    </Routes>
    </Router>
    </>
  );
}


export default App;