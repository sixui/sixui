import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Placeholder, type IPlaceholderProps } from './Placeholder';

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  styles: stylex.create({
    host: {
      width: '6rem',
      height: '6rem',
    },
  }),
} satisfies Partial<IPlaceholderProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      colsProps={[
        { $legend: 'Basic' },
        { $legend: 'With crosshairs', crosshairs: true },
        {
          $legend: 'With label',
          label: 'Label',
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
