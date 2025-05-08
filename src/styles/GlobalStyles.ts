import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #ff0000;
    --text-color: #333333;
    --background-color: #f5f5f5;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }
`;

export default GlobalStyles; 