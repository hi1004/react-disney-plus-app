import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '../styles/theme';
import HomeBackground from '../assets/images/home-background.png';
import viewersDisney from '../assets/images/viewers-disney.png';
import videoDisney from '../assets/videos/disney.mp4';
import viewersMarvel from '../assets/images/viewers-marvel.png';
import videoMarvel from '../assets/videos/marvel.mp4';
import viewersPixar from '../assets/images/viewers-pixar.png';
import videoPixar from '../assets/videos/pixar.mp4';
import viewersStarwars from '../assets/images/viewers-starwars.png';
import videoStarwars from '../assets/videos/star-wars.mp4';
import viewersNational from '../assets/images/viewers-national.png';
import videoNational from '../assets/videos/national-geographic.mp4';

const Category = () => {
  return (
    <Container>
      <Wrap>
        <img src={viewersDisney} alt="disney" />
        <video autoPlay loop muted alt="disney">
          <source src={videoDisney} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={viewersMarvel} alt="marvel" />
        <video autoPlay loop muted alt="marvel">
          <source src={videoMarvel} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={viewersPixar} alt="pixar" />
        <video autoPlay loop muted alt="pixar">
          <source src={videoPixar} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={viewersStarwars} alt="starwars" />
        <video autoPlay loop muted alt="starwars">
          <source src={videoStarwars} type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src={viewersNational} alt="national" />
        <video autoPlay loop muted alt="national">
          <source src={videoNational} type="video/mp4" />
        </video>
      </Wrap>
    </Container>
  );
};

export default Category;
const Container = styled.div`
  position: absolute;
  width: 100%;
  padding: 0 70px;
  bottom: 30px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 2fr);

  ${media.desktop`
    ${css`
      position: relative;
      bottom: 0;
      padding: 10px 70px;
      background: url(${HomeBackground}) center / cover no-repeat;
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
  ${media.tablet`
    ${css`
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
  ${media.phone`
    ${css`
      grid-template-columns: repeat(1, 1fr);
    `}
  `}
`;
const Wrap = styled.div`
  /* padding-top: 56.25%; */
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 0.5s ease-in-out;
    width: 100%;
    z-index: 1;
  }
  video {
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`;
