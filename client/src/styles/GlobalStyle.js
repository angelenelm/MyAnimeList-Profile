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
    background-color: var(--backgroundColor);
    color: var(--textColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    transition: var(--transition);
    font-family: var(--font);
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--secondaryButtonColor);
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: none;
      filter: brightness(1.1);
    }

    transition: var(--transition);
  }
`;

export default GlobalStyle;
