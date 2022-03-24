import { css } from "styled-components/macro";

const variables = css`
  html {
    --inactiveSwitchColor: #98abbb;
    --activeSwitchColor: #bae67e;
    --primaryButtonColor: #2e51a2;
    --secondaryButtonColor: #bbccdd;

    --transition: all 0.2s ease-in-out;

    --font: "Whitney", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  body[data-theme="light"] {
    --backgroundColor: #ffffff;
    --textColor: #171c28;
    --buttonTextColor: #ffffff;
  }

  body[data-theme="dark"] {
    --backgroundColor: #171c28;
    --textColor: #e7e7e7;
    --buttonTextColor: #ffffff;
  }
`;

export default variables;
