// src/components/podcast/SeasonList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SeasonList = ({ seasons, showId }) => {
  return (
    <ul>
      {seasons.map((season) => (
        <li key={season.id}>
          <Link to={`/shows/${showId}/seasons/${season.id}`}>{season.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SeasonList;