import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const searchTerm = query.get('q');
  const navigate = useNavigate();
  const fetchSearchMovie = async searchText => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchText}`,
      );
      setSearchResults(response.data.results);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  if (searchResults.length > 0) {
    return (
      <SearchContainer>
        {searchResults.map(movie => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <div className="movie" key={movie.id}>
                <h2 className="movie__title">
                  {' '}
                  {movie.title || movie.name || movie.original_name}
                </h2>
                <div
                  className="movie__column-poster"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageUrl}
                    alt="movie-img"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </SearchContainer>
    );
  }
  return (
    <NoResults>
      <div>
        <p>検索した 「{searchTerm}」 の映画が見つかりませんでした。</p>
      </div>
    </NoResults>
  );
};

export default SearchPage;
const SearchContainer = styled.section`
  background-color: #000;
  padding-top: 7rem;
  text-align: center;

  .movie {
    flex: 1 1 auto;
    display: inline-block;
    padding-right: 0.5rem;
    padding-bottom: 7rem;
    .movie__title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .movie__column-poster {
      cursor: pointer;
      overflow: hidden;

      .movie__poster {
        width: 90%;
        border-radius: 5px;
        transition: transform 0.3s;
        --webkit-transition: transform 0.3s;
        &:hover {
          transform: scale(1.25);
        }
      }
    }
  }
`;
const NoResults = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
`;
