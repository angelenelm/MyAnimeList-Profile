import styled from "styled-components/macro";

const StyledMilestonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
  justify-content: center;

  .media {
    display: block;

    &__img {
      width: 100px;
      border: 1px solid var(--color-gull-gray);
      border-radius: var(--border-radius-subtle);
    }

    &__img:hover {
      outline: 3px solid var(--primary-color);
      transition: var(--transition);
    }

    &__label {
      text-transform: uppercase;
      font-size: 1rem;
      letter-spacing: 1px;
      margin-top: 0.35rem;
    }
  }
`;

export default StyledMilestonesGrid;
