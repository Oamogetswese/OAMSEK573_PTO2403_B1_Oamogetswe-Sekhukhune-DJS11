// src/components/podcast/Episodes.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Episodes = () => {
  const { showId, seasonId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch show details');
        }
        const data = await response.json();
        const foundSeason = data.seasons.find((season) => season.id === parseInt(seasonId));
        setEpisodes(foundSeason ? foundSeason.episodes : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [showId, seasonId]);

  if (loading) return <div>Loading episodes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (episodes.length === 0) return <div>No episodes found for this season.</div>;

  return (
    <div>
      <h1>Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link to={`/shows/${showId}/seasons/${seasonId}/episodes/${episode.id}`}>
              {episode.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Episodes;