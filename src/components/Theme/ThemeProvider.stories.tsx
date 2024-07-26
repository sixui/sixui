import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IThemeProviderProps } from './ThemeProvider.types';
import { ColorInputField } from '~/components/ColorInputField';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { commonStyles } from '~/helpers/commonStyles';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { useThemeContext } from './useThemeContext';
import { ColorScheme } from '../ColorScheme';
import { generateThemeFromSourceColor } from '~/helpers/colors/generateThemeFromSourceColor';
import { ThemeProvider } from './ThemeProvider';

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
  const themeContext = useThemeContext();

  const handleChange = (color: string): void => {
    themeContext.setTheme(
      isValidHexColor(color) ? generateThemeFromSourceColor(color) : undefined,
    );
  };

  return (
    <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$lg)}>
      <ColorInputField onChange={handleChange} clearable />

      <div {...stylex.props(styles.inner)}>
        <ColorScheme />
      </div>
    </div>
  );
};

export const Dynamic: IStory = {
  render: () => <DynamicThemeProviderDemo />,
  args: defaultArgs,
};

export default meta;
