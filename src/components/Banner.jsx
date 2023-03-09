import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from '../api/axios';
import requests from '../api/request';
import usePromise from '../hooks/usePromise';
import { media } from '../styles/theme';

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

  if (loading)
    return (
      <BannerHeader>
        <Loding />
      </BannerHeader>
    );

  if (error) return <div>error</div>;
  const truncate = (str, n) => {
    return str?.length > n ? `${str.substring(0, n)}...` : str;
  };

  return (
    <BannerHeader
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      <BannerContents>
        <h1 className="title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <p className="description">{truncate(movie.overview, 100)}</p>

        <div className="buttons">
          {movie.videos?.results[0]?.key && (
            <button type="button" className="button paly">
              Paly
            </button>
          )}
        </div>
      </BannerContents>
      <div className="fadeBottom" />
    </BannerHeader>
  );
};

export default Banner;

const BannerHeader = styled.header`
  color: ${({ theme }) => theme.colors.white};
  height: 56.25vw;
  object-fit: contain;
  transition: 0.2s;
  position: relative;

  .fadeBottom {
    height: 40vw;
    transition: 0.2s;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }

  ${media.desktop`
    height: 76.25vw;
  `}
  ${media.tablet`
    height: 100vw;
  `}

  ${media.phone`
    height: 100vw;
  `}
`;
const BannerContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: absolute;
  bottom: 18vw;
  left: 40px;
  z-index: 1;

  .title {
    font-size: 3rem;
    font-weight: 800;
  }

  .description {
    width: 45rem;
    line-height: 1.3;
    font-size: 1rem;
    max-width: 400px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    .button {
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 1rem;
      font-weight: 700;
      padding: 0.4rem 1rem;
      margin-right: 1rem;
      transition: all 0.2s;

      &.play {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.black};
      }

      &:hover {
        color: ${({ theme }) => theme.colors.black};
        background-color: rgba(170, 170, 170, 0.9);
      }
    }
  }

  ${media.tablet`
    ${css`
      .description {
        font-size: 0.8rem;
        width: auto;
      }
      .info {
        text-align: start;
        padding-right: 1.2rem;
      }
      .space {
        margin-right: 0;
      }
      .button {
        font-size: 0.8rem;
        border-radius: 4px;
      }
    `}
  `}

  ${media.phone`
    left: 0;
    width: 100%;
    ${css`
      margin-left: 0px;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      .title {
        font-size: 2.5rem;
      }
      .description {
        display: none;
      }
    `}
  `}
`;

const Loding = styled.div`
  width: 35px;
  height: 35px;
  border: 5px solid #fff;
  position: absolute;
  border-radius: 50%;
  border-top-color: transparent;
  animation: loadingAnimation 0.6s infinite linear;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
