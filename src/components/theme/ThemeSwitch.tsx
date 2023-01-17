import { Button } from '@pankod/refine-antd';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { Theme } from './types';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeSwitch: React.FC<Props> = ({ theme, setTheme }) => {
  const isLight = theme === 'light';
  return (
    <Button
      style={{
        margin: 'auto 1rem',
      }}
      onClick={() => {
        const newTheme = isLight ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      }}
      icon={isLight ? <IconMoonStars /> : <IconSun />}
    />
  );
};
