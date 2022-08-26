import { css } from "styled-components/macro";

const variables = css`
  html {
    --color-dark-gray: #596975;
    --color-gray: #6d7f8f;
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
    --border-color: var(--color-gull-gray);

    --transition: all 0.15s ease-in-out;

    --font: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

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

    --border-radius-xs: 5px;
    --border-radius-sm: 8px;
    --border-radius-pill: 30px;

    --max-width: 1000px;
  }

  body[data-theme="light"] {
    --bg-color: var(--color-white);
    --text-color: var(--color-black);
  }

  body[data-theme="dark"] {
    --bg-color: var(--color-black);
    --text-color: var(--color-mercury);
    --secondary-button-color: var(--color-gray);
    --border-color: var(--color-dark-gray);
  }
`;

export default variables;
