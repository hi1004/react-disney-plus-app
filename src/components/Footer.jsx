import React from 'react';
import styled from 'styled-components';
import { AiOutlineGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <TheFooter>
      <div className="info">
        <a
          href="https://github.com/hi1004/react-disney-plus-app"
          className="github"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineGithub className="icon" />
          <span style={{ color: '#d98921' }}>HI1004</span> GitHub Repository
        </a>

        <p className="copy">
          ⓒ {new Date().getFullYear()}. DISUNEY All rights reserved.
        </p>
      </div>
    </TheFooter>
  );
};

export default Footer;
const TheFooter = styled.footer`
  padding: 30px 0;
  background-color: #000;
  ${({ theme }) => theme.common.flexCenter}
  .info {
    ${({ theme }) => theme.common.flexCenterColumn}
    gap: 1rem;
    .github {
      ${({ theme }) => theme.common.flexCenter}
      gap: 2px;
      .icon {
        font-size: 2rem;
      }
    }
    .copy {
      font-size: 0.8rem;
      color: #ccc;
    }
  }
`;
