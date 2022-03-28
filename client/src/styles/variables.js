import { css } from "styled-components/macro";

const variables = css`
  html {
    --color-gull-gray: #98abbb;
    --color-pigeon-post: #bbccdd;
    --color-mercury: #e7e7e7;
    --color-yellow-green: #bae67e;
    --color-sapphire: #2e51a2;
    --color-white: #ffffff;
    --color-black: #171c28;

    --primary-color: var(--color-sapphire);
    --inactive-switch-color: var(--color-gull-gray);
    --active-switch-color: var(--color-yellow-green);
    --primary-button-color: var(--color-sapphire);
    --secondary-button-color: var(--color-pigeon-post);
    --button-text-color: var(--color-white);

    --transition: all 0.2s ease-in-out;

    --font: "Whitney", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 24px;

    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 64px;

    --border-radius-subtle: 5px;
    --border-radius-pill: 30px;

    --site-max-width: 1300px;
  }

  body[data-theme="light"] {
    --bg-color: var(--color-white);
    --text-color: var(--color-black);
  }

  body[data-theme="dark"] {
    --bg-color: var(--color-black);
    --text-color: var(--color-mercury);
  }
`;

export default variables;
