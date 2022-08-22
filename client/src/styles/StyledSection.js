import styled from "styled-components/macro";

const StyledSection = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-xxl);

  h2 {
    position: relative;
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  h2 span {
    background-color: var(--bg-color);
    padding-right: 10px;
  }

  h2:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5em;
    border-top: 1px solid var(--color-gull-gray);
    z-index: -1;
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
