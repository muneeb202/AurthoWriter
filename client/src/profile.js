import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import redCross from './cross.png'

const Profile = ({currentUser}) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const openDocument = (id) => {
    console.log("Opening " + id);
    navigate("/documents/" + id)
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/documents');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocuments();
  }, [])

  const deleteDocument = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/documents/${id}`);
      const data = await response.json();
      console.log("Deleted " + id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="profile-page">
      <header className="home-header">
        <img className='logoImage' src={require('./Logo.png')} alt='logo' />
        <nav className="home-nav-bar">
          <a>Hello {currentUser}!</a>
          <a className='logout' href="/">Logout</a>
        </nav>
      </header>

      <main className='main-page'>
        <h1>My Books</h1>
        <div className="grid">
          {documents.map(document => (
            <div className="grid-item" key={document._id} onClick={() => openDocument(document._id)}>
              <img className='cross' src={redCross} alt={redCross} onClick={(event) => {event.stopPropagation(); deleteDocument(document._id)}}></img>
              <h2>{document._id}</h2>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/BookInfo')} className="book-button">Create Book</button>
      </main>
      <footer className="home-footer">
        <p>&copy; 2023 All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;