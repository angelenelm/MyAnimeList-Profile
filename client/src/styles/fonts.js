import { css } from "styled-components/macro";

const fonts = css`
  @font-face {
    font-family: "Whitney";
    src: url("../public/fonts/Whitney-Book.woff2") format("woff2")
      url("../public/fonts/Whitney-Book.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Whitney";
    src: url("../public/fonts/Whitney-BookItalic.woff2") format("woff2")
      url("../public/fonts/Whitney-BookItalic.woff") format("woff");
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: "Whitney";
    src: url("../public/fonts/Whitney-Semibold.woff2") format("woff2")
      url("../public/fonts/Whitney-Semibold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Whitney";
    src: url("../public/fonts/Whitney-SemiboldItalic.woff2") format("woff2")
      url("../public/fonts/Whitney-SemiboldItalic.woff") format("woff");
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: "Whitney";
    src: url("../public/fonts/Whitney-Bold.woff2") format("woff2")
      url("../public/fonts/Whitney-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
  }
`;

export default fonts;
