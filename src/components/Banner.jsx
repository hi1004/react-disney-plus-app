import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/request';
import usePromise from '../hooks/usePromise';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [loading, response, error] = usePromise(() => {
    return axios.get(requests.fetchNowPlaying);
  }, []);

  const fetchData = async () => {
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };

  useEffect(() => {
    if (response) {
      fetchData();
    }
  }, [response]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    />
  );
};

export default Banner;
