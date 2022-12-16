import * as ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import CharacterInfo from './characterInfo.jsx';
const axios = require('axios');


const App = () => {
  // initialize state for the characterInfo componenet and search bar
  const [textState, setTextState] = useState('');
  const [charState, setCharState] = useState({});
  const [lookupState, setLookupState] = useState('Search for a character!');

  // handler function to update state of text in search bar
  const textChangeHandler = (e) => {
    e.preventDefault();
    setTextState(e.target.value);
  }

  const searchHandler = (searchTerm) => {

    // make post request to server using axios
    axios.post('/characters', {
      data: {
        charName: searchTerm
      }
    })
    .then((charInfo) => {
      console.log('SERVER RESPONSE', charInfo.data[0]);
      // change the state of the characterInfo component with the new character information
      setLookupState(`Success! ${charInfo.data[0].name} details below.`);
      setCharState(charInfo.data[0]);
    })
    .catch(() => {
      // a 404 from the server means the character lookup failed. inform the user and remove any current character details
      setLookupState('Character lookup failed. Please try a different name and check your spelling.')
      setCharState({});
    })
  }

  return (
    // characterInfo component goes here
    <div>
    <div>{lookupState}</div>
    <CharacterInfo charDetails={charState}></CharacterInfo>

    <input type="text" placeholder="Character Name" value={textState} onChange={textChangeHandler}/>
    <button onClick={() => {searchHandler(textState)}}>Search</button>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);

export default App;