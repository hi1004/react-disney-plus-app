import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdPlayCircleOutline } from 'react-icons/md';
import YouTube from 'react-youtube';
import axios from '../api/axios';
import requests from '../api/request';
import usePromise from '../hooks/usePromise';
import { media } from '../styles/theme';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [loading, response, error] = usePromise(() => {
    return axios.get(requests.fetchNowPlaying);
  }, []);

  const fetchData = async () => {
    const filterVideoId = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of response.data.results) {
      const { id } = value;
      // eslint-disable-next-line no-await-in-loop
      const res = await axios.get(`movie/${id}`, {
        params: { append_to_response: 'videos' },
      });
      const videoData = res.data.videos.results;
      if (videoData.length !== 0) {
        filterVideoId.push(value.id);
      }
    }

    const movieId =
      filterVideoId[Math.floor(Math.random() * filterVideoId.length)];

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

  useEffect(() => {
    setTimeout(() => {
      setIsStart(true);
    }, 3000);
  }, []);

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
      <div className="youtube__area">
        <YouTube
          className={`player${isStart ? ' active' : ''}`}
          id="player"
          key={movie.videos?.results[0].key}
          videoId={movie.videos?.results[0].key}
          title={movie.title}
          opts={{
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              start: 0,
              fs: 0,
              controls: 0,
            },
          }}
          onReady={e => {
            e.target.playVideo();
            e.target.mute();
          }}
          disablekb
          onEnd={() => {
            setIsStart(false);
          }}
        />
        <div className="youtube__cover" />
      </div>

      <BannerContents>
        <h1 className="title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <p className="description">{truncate(movie.overview, 100)}</p>

        <div className="buttons">
          {movie.videos?.results[0]?.key && (
            <button type="button" className="button paly">
              <MdPlayCircleOutline className="play__icon" />
              <div className="play">再生</div>
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

  .youtube__area {
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 0;
      padding-top: 56.25%;
    }
  }

  .youtube__cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .player {
    display: none;

    &.active {
      display: block;
    }
  }
  #player {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -50px;
    left: 0;
    z-index: 0;
  }

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
    .fadeBottom { 
      height: 60vw;
    }
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
  bottom: 20vw;
  padding: 0 70px;
  z-index: 1;

  .title {
    font-size: 3.5rem;
    font-weight: 800;
  }

  .description {
    width: 45rem;
    line-height: 1.3;
    font-size: 1.5rem;
  }

  .buttons {
    display: flex;
    flex-direction: row;

    .button {
      font-family: 'Noto Sans JP', sans-serif;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
      font-weight: 600;
      margin-right: 1rem;
      transition: all 0.2s;
      padding: 0.8rem 1.5rem;
      background-color: #fff;
      align-items: center;
      border-radius: 4px;

      .play__icon {
        font-size: 2rem;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.black};
        background-color: rgba(224, 224, 224, 0.9);
      }
    }
  }

  ${media.desktop`
  .title {
        font-size: 3.2rem;
      }
      .description {
        font-size: 1rem;
      }
  `}

  ${media.tablet`
    ${css`
      .title {
        font-size: 3rem;
      }
      .description {
        font-size: 1rem;
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
        font-size: 1.5rem;
        text-align: center;
      }
      .description {
        display: none;
      }
      .button {
        padding: 0.5rem 1rem !important;
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
