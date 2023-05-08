import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const Login = ({setCurrentUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/Login', {
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
        setCurrentUser(username);
        console.log(username)
        navigate('/profile');
      } else {
        const errorMessage = await response.text();
        setErrorMessage(`Incorrect username or password`);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed: Network error');
    }
  };

  return (
    <div className="login-page">
      <a href='/'><div className='arrow'></div></a>
      <div className="login-container">
        <div className='login-title'>
          <h2 className="login-text">Login</h2>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br></br>
          <div className='center-button'>
            <button type="submit" className="home-button">Login</button>
          </div>
          <br></br>
          <a className="sign-form" href="/SignUp">Don't have an account? Sign up</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
