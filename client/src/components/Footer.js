import { StyledFooter } from "../styles";

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <span>Built with </span>
        <a href="https://www.reactjs.org/" target="_blank" rel="noopener noreferrer">
          React
        </a>
        <span>, </span>
        <a href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer">
          Chart.js
        </a>
        <span>, & </span>
        <a href="https://www.styled-components.com/" target="_blank" rel="noopener noreferrer">
          Styled Components
        </a>
        <span> by </span>
        <a href="https://github.com/angelenelm">angelenelm</a> 👩🏻‍💻
      </StyledFooter>
    </>
  );
};

export default Footer;
