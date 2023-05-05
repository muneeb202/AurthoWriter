import React from 'react';
import './App.css';
const Profile = () => {
  return (
    <div className="profile-page">
      <header>
        <h1>Profile</h1>
      </header>
      <main>
        <div className="grid">
          <div className="grid-item item-1">Item 1</div>
          <div className="grid-item item-2">Item 2</div>
          <div className="grid-item item-3">Item 3</div>
          <div className="grid-item item-4">Item 4</div>
          <div className="grid-item item-5">Item 5</div>
          <div className="grid-item item-6">Item 6</div>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;