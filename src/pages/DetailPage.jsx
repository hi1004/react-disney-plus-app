import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import error404 from '../assets/images/404_error.png';
import { media } from '../styles/theme';

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (err) {
        setError(true);
        throw new Error(err);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <MovieDetail>
      <div className="movie-contents">
        <h2>{movie.title || movie.original_title}</h2>
        <p>{movie?.release_date}</p>
        {!error && movie.backdrop_path !== undefined && (
          <img
            src={
              movie?.backdrop_path !== null
                ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
                : error404
            }
            alt={movie.title}
          />
        )}
        {error && <div className="error" />}
      </div>
    </MovieDetail>
  );
};

export default DetailPage;

const MovieDetail = styled.section`
  margin-top: 100px;
  .movie-contents {
    text-align: center;
    img {
      max-width: 1000px;
      display: block;
      margin: 30px auto;
    }
    .error {
      max-width: 1000px;
      height: 1033px;
      background: url(${error404});
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0 auto;
    }
    ${media.desktop`
      img{
        width: 100%;
      }
      .error {
        background-size: 100%;
        height: 800px;
      }
    `}

    h2 {
      font-size: 2rem;
    }
  }
`;
