import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import axios from '../api/axios';
import usePromise from '../hooks/usePromise';
import { media } from '../styles/theme';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, response, error] = usePromise(() => {
    return axios.get(fetchUrl);
  }, []);

  const fetchData = async () => {
    setMovies(response.data.results);
  };

  useEffect(() => {
    if (response) {
      fetchData();
    }
  }, [response]);
  if (loading)
    return (
      <Skeleton>
        <li className="row__poster skeleton">
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
          <div className="poster" />
        </li>
      </Skeleton>
    );
  if (!response) return null;
  if (error) return <div>error</div>;

  return (
    <RowContainer>
      <h2>{title}</h2>
      <Slider>
        <div className="slider__arrow slider__arrow-left">
          <span className="arrow">
            <MdKeyboardArrowLeft />
          </span>
        </div>
        <RowPostes id={id}>
          {movies.map(movie => (
            <img
              key={movie.id}
              className="row__poster"
              alt={movie.name}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
          ))}
        </RowPostes>
        <div className="slider__arrow slider__arrow-right">
          <span className="arrow">
            <MdKeyboardArrowRight />
          </span>
        </div>
      </Slider>
    </RowContainer>
  );
};

export default Row;

const Skeleton = styled.ul`
  .row__poster {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px;
    margin-top: 20px;

    .poster {
      display: grid;
      background-color: #040714;
      position: relative;
      overflow: hidden;
      height: 144px;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(
          270deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0)
        );
        transform: translateX(-100%);
        animation: skeleton-loader 2s infinite;
        @keyframes skeleton-loader {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      }
    }
  }
`;

const RowContainer = styled.div`
  h2 {
    font-size: 2rem;
    margin-left: 20px;
    font-weight: 800;
  }
`;
const Slider = styled.div`
  position: relative;
  transition: 0.4s ease-in-out;

  .slider__arrow {
    background-clip: content-box;
    padding: 20px 0;
    transition: 0.4s ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 100;
    position: absolute;
    top: 0;
    height: 100%;
    ${({ theme }) => theme.common.flexCenter}

    &.slider__arrow-left {
      left: 0;
    }

    &.slider__arrow-right {
      right: 0;
    }

    &:hover {
      background-color: rgba(20, 20, 20, 0.5);
      .arrow {
        transform: scale(1.5);
      }
    }
    .arrow {
      transition: 0.4s ease-in-out;
      font-size: 2rem;
    }
    &:hover .slider__arrow-left,
    &:hover .slider__arrow-right {
      visibility: visible;
    }
  }
`;
const RowPostes = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;
  margin-bottom: 30px;

  &::-webkit-scrollbar {
    display: none;
  }

  .row__poster {
    object-fit: contain;
    width: 100%;
    max-height: 144px;
    margin-right: 10px;
    transform: transform 0.45s;
    border-radius: 4px;
    transition: 0.2s;
    cursor: pointer;
    position: relative;

    @media screen and (min-width: 1200px) {
      max-height: 160px;
    }
    ${media.tablet`
    max-height: 280px;
  `}

    &:hover {
      transform: scale(1.02);
      filter: contrast(0.5);
    }
  }
`;
