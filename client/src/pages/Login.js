import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  background-color: var(--primaryButtonColor);
  color: var(--buttonTextColor);
  text-decoration: none;
  padding: 15px 20px;
  margin: 20px auto;
  border-radius: 5px;
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
      <StyledLoginButton href="http://localhost:8080/login">
        Log in to MyAnimeList
      </StyledLoginButton>
    </StyledLoginContainer>
  );
};

export default Login;
