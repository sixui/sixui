import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { ColorScheme, type IColorSchemeProps } from './ColorScheme';

// https://m3.material.io/styles/color/roles
// https://material-web.dev/theming/color/

const meta = {
  component: ColorScheme,
} satisfies Meta<typeof ColorScheme>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorSchemeProps>;

export const BaselineColors: IStory = {
  render: (props) => <ColorScheme {...props} />,
  args: defaultArgs,
};

export default meta;
