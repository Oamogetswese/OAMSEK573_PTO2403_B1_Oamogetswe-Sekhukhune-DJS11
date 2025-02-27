import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PodcastList.css';
import PodcastDetails from './PodcastDetails';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');  
        const data = await response.json();
        
        // Sort podcasts alphabetically by title
        const sortedPodcasts = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedPodcasts);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>
            <h3>
              <Link to={`/podcasts/${podcast.id}`}>
                {podcast.title}
              </Link>
            </h3>
            <img src={podcast.image} alt={podcast.title} style={{ width: '100px', height: '100px' }} />
            <p>{podcast.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastList;