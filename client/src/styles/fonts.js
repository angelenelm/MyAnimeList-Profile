import { css } from "styled-components/macro";

const fonts = css`
  @font-face {
    font-family: Whitney;
    src: url("../fonts/Whitney-Book.woff2") format("woff2"), url("../fonts/Whitney-Book.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: Whitney;
    src: url("../fonts/Whitney-Semibold.woff2") format("woff2"), url("../fonts/Whitney-Semibold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: Whitney;
    src: url("../fonts/Whitney-Bold.woff2") format("woff2"), url("../fonts/Whitney-Bold.woff") format("woff");
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;
