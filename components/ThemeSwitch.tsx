import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import Switch from '@mui/material/Switch';

const ThemeSwitch = () => {
  return (
    <div className='theme-switch'>
      <LightModeOutlined />
      <Switch />
      <DarkModeOutlined />
    </div>
  );
};

export default ThemeSwitch;
