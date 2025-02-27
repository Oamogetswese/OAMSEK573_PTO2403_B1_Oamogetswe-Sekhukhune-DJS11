import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import SeasonDetail from './components/SeasonDetail';
import EpisodeDetail from './components/EpisodesDetail'; // Ensure this is the correct import
import PodcastDetails from './components/PodcastDetails'; // Import the PodcastDetails component
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<ShowList />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route path="/shows/:showId/seasons/:seasonId" element={<SeasonDetail />} />
          <Route path="/shows/:showId/seasons/:seasonId/episodes/:episodeId" element={<EpisodeDetail />} />
          <Route path="/podcasts/:podcastId" element={<PodcastDetails />} /> {/* New route for PodcastDetails */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;