import React, { useState } from "react";
import {Nav, NavLink, NavMenu} from './NavbarElements';
import '../../pages/style.css'


const style = {
    display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
}


function logout(){
    fetch('http://127.0.0.1:5000/logout', 
    {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      headers: {
    'Content-Type': 'application/json'
      },
  })
  }


const Navbar = ({state}) => {
  console.log(state) 
  if (state.route == 'init')
  {
    return (
      <>
        <Nav style={style}>
          <NavMenu>
            <NavLink to="/signin" activestyle="true" state={state}>
              <b> Sign in</b>
            </NavLink>
            <NavLink to="/signup" activestyle="true" state={state}>
              <b> Sign up</b>
            </NavLink>
{/*            <NavLink to="/history" activestyle="true">
              History
            </NavLink>
            <NavLink to="/map" activestyle="true">
              Map
            </NavLink>*/}
          </NavMenu>
        </Nav>
      </>
    );
  }
  else{
    return (
      <>
        <Nav style={style}>
          <NavMenu>
{/*            <NavLink to="/signin" activestyle="true">
              Sign in
            </NavLink>
            <NavLink to="/signup" activestyle="true">
              Sign up
            </NavLink>*/}
            <NavLink to="/history" activestyle="true">
              <b>History</b>
            </NavLink>
            <NavLink to="/map" activestyle="true">
              <b>Map</b>
            </NavLink>
            <button className="button" onClick={function(){
              state.route = "init"
              logout()
              window.location = "/signin"}}>
            quit
            </button>
          </NavMenu>
        </Nav>
      </>
    );

  }
};
  
export default Navbar;
