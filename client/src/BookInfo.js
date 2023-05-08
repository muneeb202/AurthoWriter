import React, { useState, useRef } from 'react';
import './App.css';
import './Animations.css';
import { Route, Routes, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { Configuration, OpenAIApi } from "openai";
import ImageTemp from './placeholder.png';


const BookInfo = ({currentUser}) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [prompt, setPrompt] = useState("");
	const [result, setResult] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setResult(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

	const configuration = new Configuration({
		apiKey: "",
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
		},
	});

	const openai = new OpenAIApi(configuration);

	const generateImages = async (e) => {
		e.preventDefault();
		const res = await openai.createImage({
			prompt: prompt,
			n: 1,
			size: "512x512",
			//prompt
			//n 1 - 10
			//size 1024 x 1024 default $0.02
			//respose_format
			//user
		});

		setResult(res.data.data[0].url);
		//console.log(res);
	};

	const navigateToBook = (e) => {
		e.preventDefault();
		if (title == '') {
			setErrorMessage('Book title cannot be empty');
			return;
		}
		navigate('/documents/' + title)
	}

	return (
		<div className="info-bg">
			<a onClick={() => navigate('/profile')}><div className='arrow'></div></a>
			<div className='login-title'>
				<h2 className="login-text">Book Information</h2>
			</div>
			<br></br>
			<div className="info-container">
				<form className="info-form"> 
					<input type="text" onChange={(e) => setTitle(e.target.value.trim())} placeholder='Book Title' className="input-field" />
					<textarea type="text" placeholder="Book Description" className="book-desc" />
					<br></br>
					<div className='image-container'>
						<img src={result ? result : ImageTemp} alt={result ? result : "Placeholder"} width="100" height="100" onClick={() => inputRef.current.click()}/>
						<input type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} ref={inputRef} />
						<div className='image-input'>
							<textarea placeholder="Description" onChange={(e) => setPrompt(e.target.value)} />
							<button className="al" onClick={(e) => generateImages(e)}> Generate </button>
						</div>
					</div>
					{errorMessage && <p className="message">{errorMessage}</p>}
					<button onClick={(e) => navigateToBook(e)} type="submit" className="home-button">Create Book</button>
					<br></br>
				</form>
			</div>
		</div>
	);
}

export default BookInfo;
