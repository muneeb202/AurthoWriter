import React, { useState } from 'react';
import './App.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username == '') {
      setErrorMessage('Username cannot be empty');
      return
    }
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
        setErrorMessage(`User already exists`);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Sign up failed: Network error');
    }
  };

  function handleConfirmPasswordChange(e) {
    console.log(password + " " + e.target.value);
    setConfirmPassword(e.target.value);
		if (e.target.value === password) {
      console.log('Matched');
      setErrorMessage('');
    }
    else {
      setErrorMessage("Passwords do not match")
    }

	}
  

  return (
    <div className="login-page">
      <a href='/'><div className='arrow'></div></a>
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
            onChange={(event) => setUsername(event.target.value.trim())}
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
            onChange={(event) => handleConfirmPasswordChange(event)}
          />
          {errorMessage && <p className="message">{errorMessage}</p>}
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
