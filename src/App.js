import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Nav from './components/Nav';
import HomeBackground from './assets/images/home-background.png';
import Banner from './components/Banner';
import theme, { media } from './styles/theme';
import Category from './components/Category';
import Row from './components/Row';
import request from './api/request';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <Nav />
          <Banner />
          <div className="app-category">
            <Category />
          </div>
          <RowWrap>
            <Row
              title="Trending Now"
              id="TN"
              fetchUrl={request.fetchTrending}
            />
            <Row title="Top Rated" id="TR" fetchUrl={request.fetchTopRated} />
            <Row
              title="Action Movies"
              id="AM"
              fetchUrl={request.fetchActionMovies}
            />
            <Row
              title="Comedy Movies"
              id="CM"
              fetchUrl={request.fetchComedyMovies}
            />
          </RowWrap>
          <Footer />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;

const Container = styled.main`
  position: relative;
  overflow-x: hidden;
  display: block;
  &::after {
    background: url(${HomeBackground}) center / cover no-repeat;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
  .app-category {
    display: none;
  }

  ${media.desktop`
    .app-category {
      display: block;
    }
  `}
`;
const RowWrap = styled.div`
  background: url(${HomeBackground}) center / cover no-repeat;
`;
