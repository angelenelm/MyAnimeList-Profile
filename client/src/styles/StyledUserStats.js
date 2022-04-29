import styled from "styled-components/macro";

const StyledUserStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 125px);
    justify-content: center;
    margin-top: 2rem;

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
      }

      .num-label {
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 1px;
        margin-top: 0.35rem;
      }
    }
  }
`;

export default StyledUserStats;
