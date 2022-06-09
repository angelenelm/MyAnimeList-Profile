import styled from "styled-components/macro";

const StyledSection = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-xxl);

  h2 {
    display: flex;
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  .chart {
    max-height: 500px;
  }

  .charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem;
    justify-content: center;

    &__chart {
      width: 500px;
    }
  }
`;

export default StyledSection;
