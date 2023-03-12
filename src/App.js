import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

import theme from './styles/theme';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <Main>
      <div className="containerWrapper">
        <Outlet />
      </div>
      <Nav />

      <Footer />
    </Main>
  );
};

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .containerWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
