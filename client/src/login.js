import React, { useState } from 'react';
import './App.css';
import profile from './profile';
import { Route, Routes, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace the following with your own authentication logic
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      navigate('/profile'); // navigate to the Profile page
    } else {
      alert('Invalid username or password!');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-title">
          <h2 className="login-text">User Login</h2>
        </div>
        <br></br>
        <form className="login-form" onSubmit={handleLogin}>
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
          <br></br>
          <button onClick={handleLogin} type="submit" className="home-button">
            Login
          </button>
          <br></br>
          <a className="sign-form" href="/SignUp">
            Don't have an account? Sign Up
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;