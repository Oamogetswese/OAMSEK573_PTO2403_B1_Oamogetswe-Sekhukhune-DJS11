import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/podcasts/${podcastId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcast details');
        }
        const data = await response.json();
        setPodcast(data);

        const episodesResponse = await fetch(`https://podcast-api.netlify.app/podcasts/${podcastId}/episodes`);
        if (!episodesResponse.ok) {
          throw new Error('Failed to fetch episodes');
        }
        const episodesData = await episodesResponse.json();
        if (Array.isArray(episodesData)) {
          setEpisodes(episodesData);
          const uniqueSeasons = [...new Set(episodesData.map(episode => episode.season))];
          setSeasons(uniqueSeasons);
        } else {
          throw new Error('Episodes data is not an array');
        }
      } catch (error) {
        console.error('Error fetching podcast details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [podcastId]);

  const filteredEpisodes = episodes.filter(episode => episode.season === selectedSeason);

  const toggleFavorite = (episode) => {
    const isFavorite = favorites.some(fav => fav.id === episode.id);
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== episode.id);
    } else {
      // Add to favorites with timestamp
      updatedFavorites = [...favorites, { ...episode, addedAt: new Date().toISOString() }];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to local storage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {podcast && (
        <>
          <h2>{podcast.title}</h2>
          <img src={podcast.image} alt={podcast.title} style={{ width: '200px', height: '200px' }} />
          <p>{podcast.description}</p>
        </>
      )}
      <h2>Episodes for Season {selectedSeason}</h2>
      <div>
        <label htmlFor="season-select">Select Season:</label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map(season => (
            <option key={season} value={season}>
              Season {season}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredEpisodes.map(episode => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <p>Episode Number: {episode.episodeNumber}</p>
            <p>Season: {episode.season}</p>
            <button onClick={() => toggleFavorite(episode)}>
              {favorites.some(fav => fav.id === episode.id) ? 'Unlike' : 'Like'}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/favorites">Go to Favorites</Link>
    </div>
  );
};

export default PodcastDetails;