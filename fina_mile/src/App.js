import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './style.css'
import Home from './pages';
import Signup from './pages/signup'
import Signin from './pages/signin';
import History from './pages/history';
import Mapper from './pages/map';
import Contact from './pages/contact';

// import axios from "axios";
import "./index.css";

const state = {"route": "init"}


const [response, setResponse] = ""
const requestBody = ""

function get(){
    // console.log("This button Clicked!")
    fetch('http://127.0.0.1:5000/session', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify("{}"),
      // body: '{"priority" : 1}'
  })
    .then(function(response) {
      // console.log("here")
      // console.log(response.json())
      return(response.json())
    })
    .then((body) => {
      // console.log("BRUH")
      console.log(body)
      // console.log(body)
      setResponse(({
        session: body.login
      }))
      console.log("SESSION:", response.login)
    }).catch((error) => {
      if (error.response) {
        console.log("ERROR")
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

function App() {
  // get()
  // React States
  return (<>
      <Router>
      <Routes>
          <Route exact path='/' exact element={<Home />} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/history' element={<History/>} />
          <Route path='/map' element={<Mapper/>} />
      </Routes>
      </Router>
      </>
    );
  }







export default App;