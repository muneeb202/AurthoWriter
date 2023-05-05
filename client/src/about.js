import React from 'react';
import './App.css';
import {ReactComponent as ReactLogo} from './about.svg';


const AboutUs = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <img className='logoImage' src={require('./Logo.png')} alt='logo'/>
        <nav className="home-nav-bar">
          <a href="/">Home</a>
          <a href="/About">About</a>
          <a href='/Login'><button className="home-button" >Get Started</button></a>       
        </nav>
      </header>
      
      <ReactLogo/>

      <footer className="home-footer">
        <p>&copy; 2023 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
