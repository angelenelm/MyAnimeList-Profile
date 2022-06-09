import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  background-color: var(--primary-button-color);
  color: var(--button-text-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  margin: var(--spacing-md) auto;
  border-radius: var(--border-radius-subtle);
  display: inline-block;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.2);
  }

  transition: var(--transition);
`;

const Login = () => {
  return (
    <StyledLoginContainer>
      <h1>MyAnimeList Stats</h1>
      <StyledLoginButton href="http://localhost:8888/login">
        Log in to MyAnimeList
      </StyledLoginButton>
    </StyledLoginContainer>
  );
};

export default Login;
