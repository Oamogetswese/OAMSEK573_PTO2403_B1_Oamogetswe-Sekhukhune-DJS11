import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  return (
    <div>
      <h2>Your Favorite Episodes</h2>
      {favorites.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        <ul>
          {favorites.map(episode => (
            <li key={episode.id}>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
              <p>Episode Number: {episode.episodeNumber}</p>
              <p>Season: {episode.season}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">Back to Podcasts</Link>
    </div>
  );
};

export default Favorites;