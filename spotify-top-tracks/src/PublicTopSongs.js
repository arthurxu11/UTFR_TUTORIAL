// PublicTopSongs.js
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';

const PublicTopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // useEffect runs once when the component is first rendered
  useEffect(() => {
    // Fetch the top songs from your backend
    fetch('https://zany-bassoon-6r5jwj7rr7x2x54g-8000.app.github.dev/get_public', {
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

  // If the topSongs array is empty, display a loading message
  // Otherwise, display the top songs
  if (topSongs.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {Object.keys(topSongs).map((key, index) => {
          return (
            <div>
              <h1>{key}'s top songs of all time</h1>
              <Carousel topSongs={topSongs[key]} />
            </div>
          );
        })}
      </div>
    );
  }

};

export default PublicTopSongs;
