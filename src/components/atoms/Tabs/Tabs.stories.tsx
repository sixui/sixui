import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { Tabs, type ITabsProps } from './Tabs';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabsProps>;

const statesProps: IComponentPropsWithLegend<ITabsProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
];

export const Variants: IStory = {
  render: (props) => <ComponentShowcase component={Tabs} props={props} />,
  args: defaultArgs,
};

export const Variant: IStory = {
  render: (props) => (
    <ComponentShowcase component={Tabs} props={props} colsProps={statesProps} />
  ),
  args: {
    ...defaultArgs,
  },
};

export default meta;
