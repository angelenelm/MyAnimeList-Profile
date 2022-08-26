import styled from "styled-components/macro";

const StyledUserStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
    justify-content: center;
    margin: var(--spacing-xxl) 0 var(--spacing-xl);

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      border-radius: 0.25rem;
      text-align: center;

      .num {
        font-size: 1.5rem;
        font-weight: bold;

        @media (max-width: 450px) {
          font-size: 1.25rem;
        }
      }

      .num-label {
        text-transform: uppercase;
        font-size: 0.75rem;

        @media (max-width: 450px) {
          font-size: 0.65rem;
        }

        letter-spacing: 1px;
        margin-top: 0.35rem;
      }
    }
  }
`;

export default StyledUserStats;
