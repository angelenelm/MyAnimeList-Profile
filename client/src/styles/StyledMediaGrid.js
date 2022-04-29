import styled from "styled-components/macro";

const StyledMediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0.5rem;
  justify-content: center;

  .media {
    display: block;

    &__img {
      width: 100px;
      border: 1px solid var(--color-gull-gray);
      border-radius: var(--border-radius-subtle);
    }

    &__score {
      font-size: var(--fz-sm);
    }
  }
`;

export default StyledMediaGrid;
