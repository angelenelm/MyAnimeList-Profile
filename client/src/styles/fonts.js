import { css } from "styled-components/macro";

const fonts = css`
  // Inter
  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-Bold.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-SemiBoldItalic.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-SemiBoldItalic.woff") format("woff");
    font-weight: 600;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-BoldItalic.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-BoldItalic.woff") format("woff");
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-Italic.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-Italic.woff") format("woff");
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-Regular.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("../public/fonts/Inter/Inter-SemiBold.woff2") format("woff2"),
      url("../public/fonts/Inter/Inter-SemiBold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
  }
`;

export default fonts;
