import { createGlobalStyle } from "styled-components/macro";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize};
  
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    transition: ${({ theme }) => theme.transition};
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.secondaryButtonColor};
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: none;
      filter: brightness(1.1);
    }

    transition: ${({ theme }) => theme.transition};
  }
`;

export default GlobalStyle;
