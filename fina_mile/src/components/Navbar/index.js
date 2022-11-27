import React, { useState } from "react";
import {Nav, NavLink, NavMenu} from './NavbarElements';


const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/signin" activestyle="true">
            Sign in
          </NavLink>
          <NavLink to="/contact" activestyle="true">
            Contact Us
          </NavLink>
          <NavLink to="/history" activestyle="true">
            History
          </NavLink>
          <NavLink to="/map" activestyle="true">
            Map
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
