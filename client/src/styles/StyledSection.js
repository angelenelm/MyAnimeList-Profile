import styled from "styled-components/macro";

const StyledSection = styled.div`
  width: 80%;
  margin-bottom: var(--spacing-xxl);

  h2 {
    position: relative;
    margin-bottom: var(--spacing-xl);
  }

  h2 span {
    background-color: var(--bg-color);
    padding-right: var(--spacing-md);
    transition: var(--transition);
  }

  h2:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5em;
    border-top: 1px solid var(--border-color);
    z-index: -1;
    transition: var(--transition);
  }

  .charts {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    column-gap: var(--spacing-xxl);

    &__chart {
      flex-basis: 50%;
      flex-grow: 0;
    }
  }

  @media (max-width: 1000px) {
    h2 {
      font-size: var(--fz-lg);
    }

    .charts {
      display: flex;
      flex-direction: column;
      row-gap: var(--spacing-xxl);
    }
  }
`;

export default StyledSection;
