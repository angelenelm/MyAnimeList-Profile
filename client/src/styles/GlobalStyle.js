import { createGlobalStyle } from "styled-components/macro";
import normalize from "styled-normalize";
import variables from "./variables";
import fonts from "./fonts";

const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${variables};
  ${fonts};
  
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    background-color: var(--bg-color);
    color: var(--text-color);
    transition: var(--transition);
    font-family: var(--font);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
  }
`;

export default GlobalStyle;
