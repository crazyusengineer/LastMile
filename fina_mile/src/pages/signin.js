import React, { useState } from "react";
import './style.css'
import Navbar from '../components/Navbar';
// import { BrowserRouter as Router, Routes, Route}
//     from 'react-router-dom';

// import axios from "axios";
// import "./index.css";
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

function Login(){
  const state = {"route": "init"}

  const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null)
  
  function getData(){
    // console.log("This button Clicked!")
    fetch('http://127.0.0.1:5000/loginAuth', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      // body: '{"priority" : 1}'
  })
    .then(function(response) {
      // console.log("here")
      // console.log(response)
      return(response.json())
    })
    .then((body) => {
      console.log("BRUH")
      // console.log(body)
      // console.log(body)
      setResponse(({
        email: body.email,
        username: body.username
      }))
      console.log("USERNAME:", body.email)
      console.log("Now it's", state.route)
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
    getData()
    checkSession()
  }
    

  interface FormDataType {email: string, password: string}
    const requestBody: FormDataType = { email: "", password: ""}

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        requestBody.email = email
        // requestBody.username = username
        // requestBody.address = address
        requestBody.password = password
        // console.log(JSON.stringify(requestBody))
        handleSubmit()
  //Form submission happens here
    }

    const inputChangeHandler = (setFunction: React.Dispatch<React.SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
        setFunction(event.target.value)
    }


  const renderForm = (
    <div>
    <Navbar state={state} />
      <h2 style={style}>Log In</h2>      
            <form onSubmit={onSubmitHandler}>
            <div style={style2}><label htmlFor="email">Email</label></div>
            <div style={style2}><input id="email" onChange={(e)=>inputChangeHandler(setEmail, e)} placeholder="Enter email" type="text" required/>
            </div>
            <div style={style2}><label htmlFor="password">Password</label></div>
            <div style={style2}><input id="password" onChange={(e)=>inputChangeHandler(setPassword, e)} placeholder="Enter password" type="password" required/>
            </div>
            <div style={style}>
            <button className="button" type="submit"> Log In </button>
            </div>
        </form>
        </div>
    )

  // return(
  //     renderForm
  //   )
  console.log(state.route)
  if (state.route==="init"){
  return(
    // console.log(state == "init")
    renderForm
    )
  }
  else{
    window.location = "/map"  
  }
}

export default Login;