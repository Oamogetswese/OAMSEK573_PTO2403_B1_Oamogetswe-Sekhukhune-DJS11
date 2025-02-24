import React, { useEffect, useState } from 'react';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setEpisodes(data);
    };
    fetchEpisodes();
  }, []);

  return (
    <div>
      <h1>Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>{episode.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Episodes;