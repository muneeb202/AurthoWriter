import React from 'react';
import './App.css';
import TextEditor from "./TextEditor";
import { Route, Routes, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';


const BookInfo = () => {
  const navigate = useNavigate();

  const navigateToBook = () => {
    navigate('/documents/:id')
  }

  return (
      <div className="info-bg">
            <div className='login-title'>
                <h2 className="login-text">Book Information</h2>
            </div>
            <br></br>
            <div className="info-container">
                <form className="info-form">
                  <input type="text" placeholder="Book Title" className="input-field" />
                  <textarea type="text" placeholder="Book Description" className="book-desc" />
                  <br></br>
                  <div className='center-button'>
                      <button onClick={navigateToBook} type="submit" className="home-button">Create Book</button>
                  </div>
                  <br></br>
                </form>
      </div>

      <Routes>
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </div>
  );
}

function autoExpandTextArea(element) {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}

export default BookInfo;
