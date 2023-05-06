import React, { useState } from 'react';
import './App.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorMessage = await response.text();
        setErrorMessage(`Sign up failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Sign up failed: Network error');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <div className='login-title'>
          <h2 className="login-text">SignUp</h2>
        </div>
        <br></br>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br></br>
          <div className='center-button'>
            <button type="submit" className="home-button">Sign Up</button>
          </div>
          <br></br>
          <a className="sign-form" href="/Login">Already have an account? Login</a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
