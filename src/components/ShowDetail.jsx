 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SeasonList from './SeasonList';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/shows/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch show details');
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShowDetail();
  }, [id]);

  if (loading) return <div>Loading show details...</ div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
      <h2>Seasons</h2>
      <SeasonList seasons={show.seasons} showId={show.id} />
    </div>
  );
};

export default ShowDetail;