import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import HomeBackground from '../assets/images/home-background.png';
import useDebounce from '../hooks/useDebounce';
import { media } from '../styles/theme';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
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
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

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
  padding: 8rem 2rem;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  background: url(${HomeBackground}) center / cover no-repeat;

  ${media.desktop`
  grid-template-columns: repeat(2, 1fr);
  `}

  ${media.phone`
  grid-template-columns: repeat(1, 1fr);

  `}

  .movie {
    margin-bottom: 4rem;
    max-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
