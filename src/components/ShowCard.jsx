import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  return (
    <div className="show-card">
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <Link to={`/shows/${show.id}`}>View Details</Link>
    </div>
  );
};

export default ShowCard;
 