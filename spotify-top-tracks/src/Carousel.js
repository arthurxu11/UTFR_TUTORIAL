import React, { useState } from 'react';
import SongCard from './SongCard';
import { Button } from '@mui/material';

const Carousel = ({topSongs}) => {
  // Stores the index of the current song
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous song
  const goToPrevious = () => {
      const isFirstItem = currentIndex === 0;
      const newIndex = isFirstItem ? topSongs.length - 1 : currentIndex - 1;
      // TODO: Set the currentIndex state to the new index
  };

  // Function to go to the next song
  const goToNext = () => {
      const isLastItem = currentIndex === topSongs.length - 1;
      const newIndex = isLastItem ? 0 : currentIndex + 1;
      // TODO: Set the currentIndex state to the new index
  };


  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <h1 style={{ marginRight: '10px' }}>#{currentIndex+1} most popular song</h1>

          {currentIndex !== 0 && <Button onClick={goToPrevious}>Previous</Button>}
          <SongCard song={topSongs[currentIndex]} />
          {/* TODO: Conditionally render a button to go to the next song */}
          
        </div>
      </div>
  );
}

export default Carousel;