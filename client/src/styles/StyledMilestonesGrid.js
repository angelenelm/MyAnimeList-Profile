import styled from "styled-components/macro";

const StyledMilestonesGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--spacing-sm);

  .media {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 20%;
    flex-grow: 0;

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

    &__title {
      text-align: center;
      font-size: var(--fz-md);
      font-weight: 600;
    }

    &__label {
      text-align: center;
      font-size: var(--fz-xxs);
    }
  }

  @media (max-width: 1000px) {
    flex-wrap: wrap;
    justify-content: center;

    .media {
      flex-basis: 100px;

      &__title {
        font-size: var(--fz-xs);
      }

      &__label {
        font-size: 9px;
      }
    }
  }
`;

export default StyledMilestonesGrid;
