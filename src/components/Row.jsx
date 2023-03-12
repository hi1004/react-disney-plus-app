import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from '../api/axios';
import usePromise from '../hooks/usePromise';
// import { media } from '../styles/theme';
import MovieModal from './MovieModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, response, error] = usePromise(() => {
    return axios.get(fetchUrl);
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const onClickHandler = movie => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        <Content id={id}>
          {movies.map(movie => (
            <SwiperSlide key={movie.id}>
              <Wrap>
                <img
                  alt={movie.name}
                  role="presentation"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  onClick={() => onClickHandler(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setMovieModalOpen={setModalOpen} />
      )}
    </RowContainer>
  );
};

export default Row;

const Skeleton = styled.ul`
  .row__poster.skeleton {
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
  padding: 20px 0 26px 40px;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }
  .swiper {
    overflow: visible;
  }
  .swiper-pagination {
    text-align: right;
    position: absolute;
    top: -1.6rem;
    padding-right: 1rem;
    height: 0;
    &-bullet {
      background-color: #898989;
      opacity: 1;
      &-active {
        background-color: #fff;
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    width: 4.5rem;
    opacity: 0;
    transition: 0.4s;
    top: 50%;
    margin: 0;
    height: 100%;
    transform: translateY(-50%);
    &:hover {
      opacity: 1;

      background: rgb(0 0 0 / 28%);
      &::after {
        transform: scale(1.1);
      }
    }
  }
  .swiper-button-prev {
    border-radius: 6px 0 0 6px;
    left: 0;
  }
  .swiper-button-prev {
    border-radius: 0 6px 6px 0;
    right: 0;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.5rem;
    font-weight: 900;
    position: absolute;
  }
`;
const Content = styled.div``;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 0.5s ease-in-out;
    z-index: 1;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.8) 0 40px 58px -16px,
      rgba(0, 0, 0, 0.72) 0 30px 22px -10px;
    transform: scale() (0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
