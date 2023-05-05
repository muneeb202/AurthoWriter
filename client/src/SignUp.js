import React from 'react';
import './App.css';

const SignUp = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className='login-title'>
              <h2 className="login-text">SignUp</h2>
        </div>
        <br></br>
        <form className="login-form">
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
          <br></br>
          <div className='center-button'>
          <a className="center-link"  href="/Temp"><button type="submit" className="home-button">Sign Up</button></a>
          </div>
          <br></br>
          <a className="sign-form" href="/Login">Already have an account? Login</a>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
