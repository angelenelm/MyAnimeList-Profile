import styled from "styled-components/macro";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const LightModeIcon = styled(LightModeOutlinedIcon)`
  color: ${({ theme }) => theme.textColor};
`;

const DarkModeIcon = styled(DarkModeOutlinedIcon)`
  color: ${({ theme }) => theme.textColor};
`;

const ThemeToggleLabel = styled.label`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ThemeToggleSwitch = styled.div`
  position: relative;
  width: 48px;
  height: 26px;
  background: ${({ theme }) => theme.inactiveSwitchColor};
  border-radius: 26px;
  cursor: pointer;
  padding: 4px;
  transition: ${({ theme }) => theme.transition};

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    top: 50%;
    left: 4px;
    background: #ffffff;
    transform: translate(0, -50%);
    transition: ${({ theme }) => theme.transition};
  }
`;

const ThemeToggleInput = styled.input`
  display: none;
  opacity: 0;
  position: absolute;

  &:checked + ${ThemeToggleSwitch} {
    background: ${({ theme }) => theme.activeSwitchColor};

    &:before {
      transform: translate(22px, -50%);
    }
  }
`;

const ThemeToggle = ({ checked, onChange }) => {
  return (
    <ThemeToggleLabel>
      <LightModeIcon />
      <ThemeToggleInput type="checkbox" checked={checked} onChange={onChange} />
      <ThemeToggleSwitch />
      <DarkModeIcon />
    </ThemeToggleLabel>
  );
};

export default ThemeToggle;