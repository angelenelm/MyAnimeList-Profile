import styled from "styled-components/macro";

const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: var(--spacing-xs);

  @media (max-width: 600px) {
    padding-top: 3rem;
  }

  .header__img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 100%;
    border: 2px solid var(--border-color);
  }

  h1 {
    margin-top: 1.5rem;
    font-size: 2.5rem;

    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }

  .header__info {
    display: flex;
    align-items: center;
    flex-direction: row;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    &__item {
      margin: 0.25rem 1rem;
      display: inline-flex;
      align-items: center;

      svg {
        margin-right: var(--spacing-xs);
      }
    }
  }
`;

export default StyledUserInfo;
