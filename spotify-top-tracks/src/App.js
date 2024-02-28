import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import TopSongs from './TopSongs';
import PublicTopSongs from './PublicTopSongs';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/top-songs" element={<TopSongs />} />
      <Route path="/public-top-songs" element={<PublicTopSongs />} />
    </Routes>
  );
}

export default App;
