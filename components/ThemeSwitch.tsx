import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import Switch from '@mui/material/Switch';

export default function ThemeSwitch() {
  return (
    <div className='theme-switch'>
      <LightModeOutlined />
      <Switch />
      <DarkModeOutlined />
    </div>
  );
}
