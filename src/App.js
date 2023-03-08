import React from 'react';
import styled from 'styled-components';
import Nav from './components/Nav';
import HomeBackground from './assets/images/home-background.png';
import Banner from './components/Banner';

const App = () => {
  return (
    <div className="App">
      <Container>
        <Nav />
        <Banner />
      </Container>
    </div>
  );
};

export default App;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    background: url(${HomeBackground}) center / cover no-repeat;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;
