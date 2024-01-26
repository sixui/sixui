import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// https://m3.material.io/styles/typography/overview
// https://material-web.dev/theming/typography/

import { Typography, type ITypographyProps } from './Typography';

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITypographyProps>;

export const TypeScale: IStory = {
  render: (props) => <Typography {...props} />,
  args: defaultArgs,
};

export default meta;
