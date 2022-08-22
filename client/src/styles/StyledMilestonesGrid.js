import styled from "styled-components/macro";

const StyledMilestonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;

  .media {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img {
      max-width: 200px;
      border: 1px solid var(--color-gull-gray);
      border-radius: var(--border-radius-xs);
      margin-bottom: var(--spacing-xxs)
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
      font-size: var(--fz-sm);
    }
  }
`;

export default StyledMilestonesGrid;
