import styled from "styled-components/macro";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
  }

  @media (max-width: 600px) {
    header {
      padding: var(--spacing-sm);
    }
  }

  .list-select {
    label {
      display: inline;
      margin-right: var(--spacing-xxs);
    }

    #list-select {
      color: var(--text-color);
      margin-top: var(--spacing-xs);
      background-color: transparent;
      border: none;
      border-bottom: 2px solid var(--text-color);
      transition: var(--transition);
    }
  }
`;

export default StyledContainer;
