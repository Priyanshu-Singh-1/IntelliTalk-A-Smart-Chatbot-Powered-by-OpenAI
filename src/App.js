//We will have a app component, that will input a text area message
// and performs a fetch request to local host 3000 and gets bakc the response as data.message
//And this message will be displayed in the box below

import React, { useState } from 'react';
import './App.css';

function App() {

  //Declaring usestate for storing the message and the responses
  const[message, setMessage] = useState('');
  const[response, setResponse] = useState('');

  //Added the event handler when a submit button is clicked it will call the defined function that have been mentioned below
  const handleSubmit = (e) => {
    e.preventDefault();

    //Now we will fetch the url with the POST method
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        //Using JSON object for the message
        'Content-Type': 'application/json',
      },

      //Converting the JSON object to string using stringify
      body: JSON.stringify({ message} ),
    })

    //Now, we will save the result
    .then((res) => res.json())
    .then((data) => setResponse(data.message));
  };

  return (
      <div className="App">
          <h1 className='title'>ELon Musk ChatGPT3 Mind</h1>
          <h2 className='title'>Get Motivation For Success.</h2>
        <form onSubmit={handleSubmit} className="form-input">
          <textarea
          value={message}
          placeholder = "Ask Elon Musk about anything"
          onChange = {(e) => setMessage(e.target.value)} 
          ></textarea>

          <button type="submit" className='submit'>Submit</button>
        </form>

        {response && <div className='elon'> <b>Elon Musk: </b> {response} </div> }
      </div>
  );
}

export default App