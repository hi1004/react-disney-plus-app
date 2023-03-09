import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';

const Nav = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const isShow = window.scrollY > 50;
      setShow(isShow);
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo href="/">
        <img src={logo} alt="Disney Plus Logo" />
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 70px;
  transition: background-color 0.4s;
  background-color: ${props => (props.show ? '#090b13' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;
