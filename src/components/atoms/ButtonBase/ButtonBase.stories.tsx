import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { ButtonBase, type IButtonBaseProps } from './ButtonBase';

const meta = {
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IButtonBaseProps>;

const statesProps: IComponentPropsWithLegend<IButtonBaseProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ButtonBase}
      props={props}
      colsProps={statesProps}
    />
  ),
  args: defaultArgs,
};

export default meta;
