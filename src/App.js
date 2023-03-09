import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Nav from './components/Nav';
import HomeBackground from './assets/images/home-background.png';
import Banner from './components/Banner';
import theme from './styles/theme';
import Category from './components/Category';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <Nav />
          <Banner />
          <Category />
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
`;
