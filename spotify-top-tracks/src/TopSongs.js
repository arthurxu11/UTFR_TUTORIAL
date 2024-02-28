// TopSongs.js
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import { Button , TextField} from '@mui/material';

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [userName, setUsername] = useState('');

  // Function to update the state based on TextField changes
  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to get the access token from the cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Function to send your data to the remote server to make the user's top songs public or private
  const makePublicPrivate = () => {
    // TODO: Send a POST request to the backend to make the user's top songs public or private
    // Backend endpoint: https://zany-bassoon-6r5jwj7rr7x2x54g-8000.app.github.dev/make_public
    fetch('', {
      method: '',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('access_token')
        },
      body: JSON.stringify({ songs: topSongs, user: userName })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  // useEffect runs once when the component is first rendered
  useEffect(() => {
    // Fetch the top songs from your backend
    fetch('http://localhost:8000/top_tracks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('access_token')
        }
        })
        .then(response => response.json())
        .then(data => setTopSongs(data))
        .catch(error => console.error('Error:', error));
  }, []);

  // Wait until the top songs are fetched
  if (topSongs.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* TODO: Use the carousel component and pass in the topSongs prop */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TextField id="standard-basic" label="Name" style={{marginRight: '1vh'}}  value={userName} onChange={handleChange}/>
          <Button variant="contained" onClick={makePublicPrivate}>Make Public</Button>
        </div>
      </div>
    );
  }

};

export default TopSongs;
