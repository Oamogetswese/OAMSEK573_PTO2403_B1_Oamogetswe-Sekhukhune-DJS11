
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const EpisodeDetail = () => {
  const { showId, seasonId, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons/${seasonId}/episodes/${episodeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch episode details');
        }
        const data = await response.json();
        setEpisode(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodeDetail();
  }, [showId, seasonId, episodeId]);

  if (loading) return <div>Loading episode details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{episode.title}</h1>
      <p>{episode.description}</p>
      <audio controls>
        <source src={episode.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EpisodeDetail;