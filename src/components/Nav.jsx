import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputEl = useRef();

  const scrollHandler = () => {
    const isShow = window.scrollY > 50;
    setShow(isShow);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const onChange = e => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      navigate(`/main`);
      return;
    }
    navigate(`/search?q=${e.target.value}`);
  };

  const onClickHandler = () => {
    inputEl.current.focus();
  };

  return (
    <NavWrapper show={show}>
      <Logo href="/">
        <img src={logo} alt="Disney Plus Logo" />
      </Logo>
      {pathname === '/' ? (
        <Login>LOGIN</Login>
      ) : (
        <Search>
          <AiOutlineSearch className="search__icon" onClick={onClickHandler} />
          <Input
            className="nav__input"
            value={searchValue}
            type="text"
            placeholder="映画を検索してください。"
            onChange={onChange}
            ref={inputEl}
          />
        </Search>
      )}
    </NavWrapper>
  );
};

export default Nav;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #9f9c9c;
    border-color: transparent;
  }
`;

const Search = styled.div`
  height: 34px;
  position: relative;
  left: 0px;
  cursor: pointer;

  .search__icon {
    position: absolute;
    height: 24px;
    top: 0;
    bottom: 0;
    left: 5px;
    margin: auto;
    transition: 0.4s;
    z-index: 1000;
    font-size: 1.8rem;
  }
`;
const Input = styled.input`
  width: 0px;
  height: 34px;
  padding: 4px 0 4px 40px;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 12px;
  transition: 0.4s;

  &:focus {
    width: 200px;
    border: 1px solid #fff;
    background-color: #000;
  }
`;
const NavWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 80px;
  transition: background-color 0.4s;
  background-color: ${props => (props.show ? '#090b13' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  letter-spacing: 16px;
  z-index: 100;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: linear-gradient(
      180deg,
      rgba(9, 11, 19, 0.7) 10%,
      transparent
    );
    z-index: -1;
  }
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
