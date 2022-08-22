import styled from "styled-components/macro";
import { logout } from "../myanimelist";

const StyledLogoutButton = styled.button`
  position: absolute;
  display: inline-block;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-xs);
  background-color: var(--secondary-button-color);
  color: var(--button-text-color);
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.05);
  }

  transition: var(--transition);
`;

const LogoutButton = () => {
  return <StyledLogoutButton onClick={logout}> Log out</StyledLogoutButton>;
};

export default LogoutButton;
