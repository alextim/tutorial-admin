import { Button } from '@pankod/refine-antd';
import type { Theme } from './types';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
// className="icon icon-tabler icon-tabler-moon-stars"
const IconMoonStars = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
    <path d="M19 11h2m-1 -1v2"></path>
  </svg>
);
// className="icon icon-tabler icon-tabler-sun"
const IconSun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
  </svg>
);

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
        localStorage.setItem('theme', newTheme);
      }}
      icon={isLight ? <IconMoonStars /> : <IconSun />}
    />
  );
};
