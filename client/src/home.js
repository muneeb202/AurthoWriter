import React from 'react';
import './App.css';

const Home = () => {
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

      <div>
          <div  className='area'>
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
          </div>
            

          <main className="home-content">
                <h1>Authowriter</h1>
                <p>A platform that provides authors a simple and convenient way to write and publish books.</p>
                <a href='/BookInfo'><button className="home-button">Create Book</button></a>
          </main>
          <img className='mainImage' src={require("./img1.png")} alt='img1'></img>
      </div>

      <footer className="home-footer">
        <p>&copy; 2023 All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
