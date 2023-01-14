import { Button, Space } from '@pankod/refine-antd';
import { IconMoonStars, IconSun } from '@tabler/icons';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeSwitch: React.FC<Props> = (props) => {
  return (

      <Button
      style={{
        margin: 'auto 1rem',
      }}
        onClick={() => {
          props.setTheme(props.theme === 'light' ? 'dark' : 'light');
        }}
        icon={props.theme === 'light' ? <IconMoonStars /> : <IconSun />}
      />
  );
};
