import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { Checkbox } from '~/components/Checkbox';
import { ColorInput } from '~/components/ColorInput';
import { ColorScheme } from '~/components/ColorScheme';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { generateThemeFromSourceColor } from '~/utils/colors/generateThemeFromSourceColor';
import { isValidHexColor } from '~/utils/colors/isValidHexColor';
import { useThemeContext } from './Theme.context';
import { ThemeProvider } from './ThemeProvider';
import { useThemeSetterContext } from './ThemeSetter.context';

const meta = {
  component: ThemeProvider,
} satisfies Meta<typeof ThemeProvider>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IThemeProviderProps>;

const DynamicThemeProviderDemo: React.FC = () => {
  const themeContext = useThemeContext();
  const themeSetterContext = useThemeSetterContext();

  const handleColorChange = (color: string): void => {
    themeSetterContext.setTheme({
      tokens: {
        colorScheme: isValidHexColor(color)
          ? generateThemeFromSourceColor(color)
          : undefined,
      },
    });
  };

  const [isDarkMode, setDarkMode] = useState(
    themeContext.colorSchemeVariant === 'dark',
  );

  const handleDarkModeChange = (isDarkMode: boolean): void => {
    themeSetterContext.setColorSchemeVariant(isDarkMode ? 'dark' : 'light');
    setDarkMode(isDarkMode);
  };

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$md" align="center">
        <ColorInput onChange={handleColorChange} clearable grow={1} />
        <Checkbox
          label="Dark mode"
          onChange={handleDarkModeChange}
          checked={isDarkMode}
        />
      </Flex>

      <Paper p="$lg" outline="$xs" outlineStyle="dashed">
        <ColorScheme />
      </Paper>
    </Flex>
  );
};

export const Dynamic: IStory = {
  render: () => <DynamicThemeProviderDemo />,
  args: defaultArgs,
};

export default meta;
