 // src/pages/Home.jsx
import React from 'react';
import PodcastList from '../components/PodcastList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Podcast App</h1>
      <PodcastList /> {/* Include the PodcastList component here */}
    </div>
  );
};

export default Home;