import React from "react";
import logo from "./Logo.png";
import { useState } from "react";
import Temp from "./Temp";
import { Configuration, OpenAIApi } from "openai";
import imageHandler from "./TextEditor.js";
import { myfunct } from "./TextEditor.js";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="nav-menu">
        <ul className="nav-menu-items">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

function Footer() {
  return <div className="footer">this is footer</div>;
}

// function SideBar() {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");

//   const configuration = new Configuration({
//     apiKey: "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",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
//     },
//   });

//   const openai = new OpenAIApi(configuration);

//   const genrateImage = async () => {
//     const res = await openai.createImage({
//       prompt: prompt,
//       n: 1,
//       size: "512x512",
//       //prompt
//       //n 1 - 10
//       //size 1024 x 1024 default $0.02
//       //respose_format
//       //user
//     });

//     setResult(res.data.data[0].url);

//     //console.log(res);
//   };

//   const putImage = async () => {
//     //console.log(result);
//     myfunct(result);

//     console.log("place image ");
//   };

//   //console.log(prompt);
//   return (
//     <div className="no">
//       <h2>genrate image</h2>
//       <br />
//       <textarea
//         placeholder="lets genrate image"
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <br />
//       <button onClick={genrateImage}>genrateimage</button>
//       <hr />

//       <img
//         className="created_image"
//         src={result}
//         alt={result}
//         width="100"
//         height="100"
//       />
//       <button onClick={putImage}>place</button>
//     </div>
//   );
// }

function FormButton() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [divList, setDivList] = useState([]);

  const doneClick = (event) => {
    setDecider(!decider);
    const key = event.target.getAttribute("data-key");
    setMykey(key);

    console.log(decider);
  };

  function newDIV(namew, titlew) {
    const newDivList = [
      ...divList,

      <div key={namew + titlew} onClick={doneClick} data-key={namew + titlew}>
        {namew} , {titlew}
      </div>,
    ];

    setDivList(newDivList);
  }

  const createNew = (event) => {
    event.preventDefault();
    if (name && title) {
      console.log("All fields are filled");
      newDIV(name, title);
      setName("");
      setTitle("");
      setShowForm(false);
    } else {
      console.log("Please fill in all fields");
    }
  };

  //decider
  const [decider, setDecider] = useState(false);
  const [mykey, setMykey] = useState("");

  return (
    <>
      {decider ? (
        <>
          <Temp propValue={mykey} />
        </>
      ) : (
        <>
          <button onClick={handleClick}>CREATE BOOK</button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <label>
                Book Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label>
                Book Title:
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <button type="submit" onClick={createNew}>
                Submit
              </button>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </form>
          )}
          <div className="ll">{divList}</div>
        </>
      )}
    </>
  );
}

export { Header, Footer, FormButton };
