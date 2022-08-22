import styled from "styled-components/macro";

const StyledTopRatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .media {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img {
      width: 100px;
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
    }
  }
`;

export default StyledTopRatedGrid;
