import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #121212;
    --blue: #2e51a2;
    --white: #ffffff;

    --font: 'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--white);
    font-family: var(--font);
  }
`;