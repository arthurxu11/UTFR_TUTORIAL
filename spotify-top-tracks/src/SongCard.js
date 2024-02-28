import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const SongCard = ({ song }) => {
  return (
    <Card style={{ width: 300, margin: 10 }}>
      <CardMedia
        component="img"
        height="140"
        image={song.image}
        alt={song.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {song.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {song.artists}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SongCard;