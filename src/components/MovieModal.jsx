import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';
import { VscMute, VscUnmute } from 'react-icons/vsc';
import axios from '../api/axios';
import { media } from '../styles/theme';

const MovieModal = ({
  backdrop_path,
  title,
  id,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setMovieModalOpen,
}) => {
  const [movie, setMovie] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [movieSound, setMovieSound] = useState(false);
  const player = useRef();

  const fetchData = async () => {
    try {
      const { data: movieDetail } = await axios.get(`movie/${id}`, {
        params: { append_to_response: 'videos' },
      });
      setMovie(movieDetail);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsStart(true);
    }, 500);
  }, []);
  return (
    <Presentation>
      <div className="wrapper-modal" role="presentation">
        <div className="modal">
          <span
            role="button"
            tabIndex="0"
            onClick={() => setMovieModalOpen(false)}
            className="modal-close"
          >
            <MdOutlineClose />
          </span>

          <div>
            <img
              className="modal__poster-img"
              alt={name}
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            />

            {isStart && movie.videos?.results.length !== 0 && (
              <div className="youtube__area">
                <YouTube
                  className={`player${isStart ? ' active' : ''}`}
                  id="player"
                  width="800"
                  height="450"
                  ref={player}
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
                    e.target.mute();
                  }}
                  onStateChange={e => {
                    if (e.target.data === 1) {
                      console.log(e.target.unMute());
                    }
                  }}
                  onEnd={() => {
                    setIsStart(false);
                  }}
                />
                <div className="youtube__cover">a</div>
                <button
                  className="youtube__sound-button"
                  type="button"
                  onClick={() => {
                    setMovieSound(!movieSound);
                    if (!movieSound) {
                      player.current.internalPlayer.unMute();
                    } else {
                      player.current.internalPlayer.mute();
                    }
                  }}
                >
                  {!movieSound ? (
                    <VscMute className="sound-icon" />
                  ) : (
                    <VscUnmute className="sound-icon" />
                  )}
                </button>
              </div>
            )}
          </div>
          <ModalContent>
            <p className="modal__details">
              <span className="modal__user_perc" />{' '}
              {release_date || first_air_date}
            </p>

            <h2 className="modal__title">{title || name}</h2>
            <p className="modal__score">Rated: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </ModalContent>
        </div>
      </div>
    </Presentation>
  );
};

export default MovieModal;
const Presentation = styled.div`
  z-index: 101;
  position: absolute;
  .youtube__area {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
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
  .youtube__sound-button {
    position: absolute;
    right: 3rem;
    bottom: 4rem;
    z-index: 100;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    .sound-icon {
      color: rgba(255, 255, 255, 0.5);
      font-size: 2rem;
      transition: 0.2s;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 3px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      width: 2.8rem;
      height: 2.8rem;
    }

    &:hover {
      .sound-icon {
        color: rgba(255, 255, 255, 1);
      }
      &::after {
        content: '';

        border: 3px solid rgba(255, 255, 255, 1);
      }
    }
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
    top: 0px;
    left: 0;
    z-index: 0;
  }
  .wrapper-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0 0 0/ 71%);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      position: relative;
      max-width: 800px;
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12);
      background-color: #111;
      overflow: hidden;
      border-radius: 8px;
      transition: all 0.4s ease-in-out 2s;
      animation: fadeIn 0.4s;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(rgba(9, 11, 19, 0.8) 10%, transparent);
      }

      &::-webkit-scrollbar {
        display: none;
        visibility: hidden;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      .modal-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 2rem;
        cursor: pointer;
        z-index: 100;
      }
      .modal__poster-img {
        width: 100%;
        height: auto;
      }
    }

    @media screen and (max-height: 768px) {
      align-items: unset;
      padding-top: 2rem;
      .modal {
        overflow-y: scroll;
      }
    }

    ${media.tablet`
      ${css`
        padding: 0;
        .modal {
          overflow-y: scroll !important;
        }
      `}    
    `}
  }
`;
const ModalContent = styled.div`
  padding: 40px;
  color: #fff;
  .modal__title {
    padding: 0;
    font-size: 40px;
    margin: 16px 0;
  }
  .modal__details {
    font-size: 10px;
    font-weight: 600;
  }
  .modal__overview {
    font-size: 20px;
    line-height: 1.5;
  }
  ${media.tablet`
    ${css`
      .modal__overflow {
        font-size: 1rem;
      }
      .modal__details {
        font-size: 1rem;
      }
    `}    
  `}
`;
