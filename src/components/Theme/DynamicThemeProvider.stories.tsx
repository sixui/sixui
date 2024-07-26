import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IDynamicThemeProviderProps } from './DynamicThemeProvider.types';
import { ColorInputField } from '~/components/ColorInputField';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { DynamicThemeProvider } from './DynamicThemeProvider';
import { commonStyles } from '~/helpers/commonStyles';
import { ColorScheme } from '../ColorScheme';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';

const meta = {
  component: DynamicThemeProvider,
} satisfies Meta<typeof DynamicThemeProvider>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  inner: {
    padding: '1rem',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colorSchemeTokens.outlineVariant,
  },
});

const defaultArgs = {} satisfies Partial<IDynamicThemeProviderProps>;

const DynamicThemeProviderDemo: React.FC<IDynamicThemeProviderProps> = (
  props,
) => {
  const { sourceColor: sourceColorProp, ...other } = props;
  const [sourceColor, setSourceColor] = useState(sourceColorProp);

  return (
    <div {...stylex.props()}>
      <DynamicThemeProvider
        {...other}
        sx={[commonStyles.verticalLayout, commonStyles.gap$lg]}
        sourceColor={
          sourceColor && isValidHexColor(sourceColor) ? sourceColor : undefined
        }
      >
        <ColorInputField
          onChange={setSourceColor}
          value={sourceColor}
          clearable
        />

        <div {...stylex.props(styles.inner)}>
          <ColorScheme />
        </div>
      </DynamicThemeProvider>
    </div>
  );
};

export const Basic: IStory = {
  render: (props) => <DynamicThemeProviderDemo {...props} />,
  args: defaultArgs,
};

export default meta;
