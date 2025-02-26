// src/components/podcast/EpisodeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EpisodeList = ({ episodes }) => {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <Link to={`/shows/${episode.showId}/seasons/${episode.seasonId}/episodes/${episode.id}`}>
            {episode.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;