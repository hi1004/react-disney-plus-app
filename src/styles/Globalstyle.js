import { createGlobalStyle, css } from 'styled-components';
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
