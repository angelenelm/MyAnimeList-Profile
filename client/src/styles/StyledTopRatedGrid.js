import styled from "styled-components/macro";

const StyledTopRatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-xxs);

  .media {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img {
      width: 100%;
      border: 1px solid var(--color-gull-gray);
      border-radius: var(--border-radius-xs);
      margin-bottom: var(--spacing-xxs);
    }

    &__img:hover {
      outline: 3px solid var(--primary-color);
      transition: var(--transition);
    }

    &__score {
      text-align: center;
      font-size: var(--fz-sm);
      margin-bottom: 0;
    }
  }

  @media (max-width: 600px) {
    .media {
      &__score {
        font-size: 10px;
      }
    }
  }
`;

export default StyledTopRatedGrid;
