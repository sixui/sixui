import type { Meta, StoryObj } from '@storybook/react';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { ColorInputField } from '~/components/ColorInputField';
import { ColorScheme } from '~/components/ColorScheme';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { generateThemeFromSourceColor } from '~/helpers/colors/generateThemeFromSourceColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { ThemeProvider } from './ThemeProvider';
import { useThemeSetterContext } from './ThemeSetter.context';

const meta = {
  component: ThemeProvider,
} satisfies Meta<typeof ThemeProvider>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IThemeProviderProps>;

const DynamicThemeProviderDemo: React.FC = () => {
  const themeSetterContext = useThemeSetterContext();

  const handleChange = (color: string): void => {
    themeSetterContext.setTheme({
      tokens: {
        colorScheme: isValidHexColor(color)
          ? generateThemeFromSourceColor(color)
          : undefined,
      },
    });
  };

  return (
    <Flex direction="column" gap="$2">
      <ColorInputField onChange={handleChange} clearable />

      <Paper p="$4" outline="$xs" outlineStyle="dashed">
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
