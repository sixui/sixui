import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { Tab, type ITabProps } from './Tab';

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabProps>;

const statesProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      colsProps={[{ variant: 'primary' }]}
    />
  ),
  args: defaultArgs,
};

export const Variant: IStory = {
  render: (props) => (
    <ComponentShowcase component={Tab} props={props} colsProps={statesProps} />
  ),
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export default meta;
