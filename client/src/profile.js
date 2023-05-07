import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

const Profile = (props) => {
  // const [documents, setDocuments] = useState([]);
  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   if (socket == null) return;
  //   socket.once("retrieved", (docs) => {
  //     setDocuments(docs)
  //   });
  // }, [socket, documents]);

  // useEffect(() => {
	// 	const s = io("http://localhost:3000");
	// 	setSocket(s);

	// 	return () => {
	// 		s.disconnect();
	// 	};
	// }, []);

  useEffect(() => {
    console.log("Welcome");
  }, [])

  return (
    <div className="profile-page">
      <header className="home-header">
        <img className='logoImage' src={require('./Logo.png')} alt='logo' />
        <nav className="home-nav-bar">
          <a href="/">Home</a>
          <a href="/About">About</a>
          <a href='/Login'><button className="home-button" >Get Started</button></a>
        </nav>
      </header>

      <main className='main-page'>
        <div className="grid">
          <div className="grid-item item-1">{props.currentUser}</div>
          <div className="grid-item item-2">Item 2</div>
          <div className="grid-item item-3">Item 3</div>
          <div className="grid-item item-4">Item 4</div>
          <div className="grid-item item-5">Item 5</div>
          <div className="grid-item item-6">Item 6</div>
        </div>
        {/* <div className="container">
          {documents.map(document => (
            <div className="document" key={document._id}>
              <h2>{document._id}</h2>
            </div>
          ))}
        </div> */}
      </main>

      <footer className="home-footer">
        <p>&copy; 2023 All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;