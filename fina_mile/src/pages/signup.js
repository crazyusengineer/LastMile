import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Map from './map'
import './style.css'
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import {useLocation, Navigate, Link}
    from 'react-router-dom';

const style={
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '10vh',
            }

const style2={
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '5vh',
            }

function Signup() {
  const state = {"route": "init"}
  // console.log("This state is: ", states.route)

  const errors = {
    username: "invalid username",
    pwd: "invalid password"
  };

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
	const [states, setStates] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState("")
  
  function sendData(){
  	fetch('http://127.0.0.1:5000/registerAuth', 
    {
      method: "POST",
      credentials: 'include',
      // mode: 'no-cors',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      // body: '{"priority" : 1}'
  })
    .then(function(response) {
      console.log("here")
      // console.log(response.json())
      return(response.json())
    })
    .then((body) => {
      // console.log("BRUH")
      console.log(body)
      // console.log(body)
      setResponse(({
        email: body.email,
        username: body.username
      }))
      console.log("USERNAME:", response.username)
      // location.state.status = "login"
    }).catch((error) => {
      if (error.response) {
        console.log("ERROR")
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

  }
  function checkSession(){
    fetch('http://127.0.0.1:5000/session', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      // body: '{"priority" : 1}'
  }).then(function(response){
        console.log("AOIJIU", response)
        console.log(response.status)
        if (response.status === 200){
          window.location = "/map" 
        }
        else{
          alert("Information's not correct!")
        }
      })
  }


  const handleSubmit = (event) => {
    sendData()
    checkSession()
  }

	interface FormDataType {username:string, email: string, building: string, street: string, city: string, states: states, password: string}
    const requestBody: FormDataType = {username: "", email: "", building: "", street: "", city: "", states: "", password: ""}

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        requestBody.email = email
        requestBody.username = username
        requestBody.building = building
        requestBody.street = street
        requestBody.city = city
        requestBody.states = states
        requestBody.password = password
        console.log(JSON.stringify(requestBody))
        handleSubmit()
	//Form submission happens here
    }

    const inputChangeHandler = (setFunction: React.Dispatch<React.SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
        setFunction(event.target.value)
    }

    const renderForm = (
            <div>
                <Navbar state={state} />
            <h2 style={style}>Sign Up</h2>      
        <form onSubmit={onSubmitHandler}>
          <div style={style2}><label htmlFor="username">Username</label></div>
            <div style={style2}><input id="username" onChange={(e)=>inputChangeHandler(setUsername, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="email">Email</label></div>
            <div style={style2}><input id="email" onChange={(e)=>inputChangeHandler(setEmail, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="street">Street</label></div>
            <div style={style2}><input id="street" onChange={(e)=>inputChangeHandler(setStreet, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="building">Building Number</label></div>
            <div style={style2}><input id="building" onChange={(e)=>inputChangeHandler(setBuilding, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="city">City</label></div>
            <div style={style2}><input id="city" onChange={(e)=>inputChangeHandler(setCity, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="states">State</label></div>
            <div style={style2}><input id="states" onChange={(e)=>inputChangeHandler(setStates, e)} type="text" required/></div>
            <div style={style2}><label htmlFor="password">Password</label></div>
            <div style={style2}><input id="password" onChange={(e)=>inputChangeHandler(setPassword, e)} type="password" required/></div>
            
            <div style={style}>
            <button className="button" type="submit"> Sign Up </button>
            </div>
        </form>
        </div>
    )

  return(renderForm)

}

export default Signup;