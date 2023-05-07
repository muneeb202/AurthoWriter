// import { Header, Footer, FormButton, SideBar } from "./Header.js";
import { useState } from 'react'
import Login from './login.js';
import "./App.css";
import Home from "./home.js";
import SignUp from "./SignUp.js"
import BookInfo from "./BookInfo.js"
import About from "./about.js"
import {Route,Routes} from "react-router-dom"
import TextEditor from "./TextEditor";
import Profile from "./profile";
function App() {
  const [currentUser, setCurrentUser] = useState('')
  return (
    <div>
      {/* <SideBar /> */}
      {/* <FormButton /> */}
      {/* <Login/> */}
      {/* <Temp /> */}
      <Routes>
      <Route exact path="/About" element={<About/>}/>
        <Route exact path="/BookInfo" element={<BookInfo currentUser={currentUser}/>}/>
        <Route exact path="/documents/:id" element={<TextEditor set/>}/>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/Login" element={<Login setCurrentUser={setCurrentUser}/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile currentUser={currentUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
