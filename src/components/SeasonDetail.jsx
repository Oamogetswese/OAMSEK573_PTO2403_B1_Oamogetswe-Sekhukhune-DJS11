// src/components/podcast/SeasonDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeList from './EpisodeList';

const SeasonDetail = () => {
  const { showId, seasonId } = useParams();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonDetail = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons/${seasonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch season details');
        }
        const data = await response.json();
        setSeason(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasonDetail();
  }, [showId, seasonId]);

  if (loading) return <div>Loading season details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Seasons</h1>
      <h2>Episodes</h2>
      <EpisodeList episodes={season.episodes} />
    </div>
  );
};

export default SeasonDetail;