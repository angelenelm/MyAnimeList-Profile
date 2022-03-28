import styled from "styled-components/macro";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const ThemeToggleLabel = styled.label`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const ThemeToggleSwitch = styled.div`
  position: relative;
  width: 48px;
  height: 26px;
  background: var(--inactive-switch-color);
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  padding: 4px;
  transition: var(--transition);

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: var(--border-radius-pill);
    top: 50%;
    left: 4px;
    background: #ffffff;
    transform: translate(0, -50%);
    transition: var(--transition);
  }
`;

const ThemeToggleInput = styled.input`
  display: none;
  position: absolute;

  &:checked + ${ThemeToggleSwitch} {
    background: var(--active-switch-color);

    &:before {
      transform: translate(22px, -50%);
    }
  }
`;

const ThemeToggle = ({ checked, onChange }) => {
  return (
    <ThemeToggleLabel>
      <LightModeOutlinedIcon />
      <ThemeToggleInput type="checkbox" checked={checked} onChange={onChange} />
      <ThemeToggleSwitch />
      <DarkModeOutlinedIcon />
    </ThemeToggleLabel>
  );
};

export default ThemeToggle;