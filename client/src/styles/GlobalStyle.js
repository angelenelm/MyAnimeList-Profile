import { createGlobalStyle } from "styled-components/macro";
import variables from "./variables";
import fonts from "./fonts";

const GlobalStyle = createGlobalStyle`
  ${fonts}
  ${variables}
  
  html {
    box-sizing: border-box;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--white);
    font-family: var(--font);
    color: var(--black)
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  a {
    transition: var(--transition);
    text-decoration: none;
    color: var(--blue);
    display: inline-block;

    &:hover, &:focus {

    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    transition: var(--transition);
    &:focus,
    &:active {
      outline: 0;
    }
  }
`;

export default GlobalStyle;
