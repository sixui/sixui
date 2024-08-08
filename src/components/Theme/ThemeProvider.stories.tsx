import type { Meta, StoryObj } from '@storybook/react';
import { useContext } from 'react';
import stylex from '@stylexjs/stylex';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { ColorScheme } from '~/docs/ColorScheme';
import { generateThemeFromSourceColor } from '~/helpers/colors/generateThemeFromSourceColor';
import { ColorInputField } from '../ColorInputField';
import { Stack } from '../Stack';
import { ThemeProvider } from './ThemeProvider';
import { ThemeSetterContext } from './ThemeSetter.context';

const meta = {
  component: ThemeProvider,
} satisfies Meta<typeof ThemeProvider>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  inner: {
    padding: '1rem',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colorSchemeTokens.outlineVariant,
  },
});

const defaultArgs = {} satisfies Partial<IThemeProviderProps>;

const DynamicThemeProviderDemo: React.FC = () => {
  const themeSetterContext = useContext(ThemeSetterContext);

  const handleChange = (color: string): void => {
    themeSetterContext?.setTheme(
      isValidHexColor(color) ? generateThemeFromSourceColor(color) : undefined,
    );
  };

  return (
    <Stack gap={2}>
      <ColorInputField onChange={handleChange} clearable />

      <div {...stylex.props(styles.inner)}>
        <ColorScheme />
      </div>
    </Stack>
  );
};

export const Dynamic: IStory = {
  render: () => <DynamicThemeProviderDemo />,
  args: defaultArgs,
};

export default meta;
