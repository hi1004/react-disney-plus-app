import styled, { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
${css`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans JP', sans-serif;
    line-height: 1.4;
    background-color: #040714;
    color: #f9f9f9;
    word-break: break-word;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
  }
`}
`;

export default GlobalStyle;
export const Loding = styled.div`
  width: 35px;
  height: 35px;
  border: 5px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: loadingAnimation 0.6s infinite linear;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
