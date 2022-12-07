import React from 'react';
import Link from 'react-router-dom'
import Navbar from '../components/Navbar';

const state = {"route": "init"}
const style={
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '10vh',
            }
const Home = () => {
return (
	<div>
	      <Navbar state={state} />
	<h1 style={style}>This is Finamile!</h1>
	<h1 style={style}>Please sign in or sign up</h1>
	</div>
);
};

export default Home;
