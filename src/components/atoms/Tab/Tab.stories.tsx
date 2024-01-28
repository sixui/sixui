import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { type ITabProps, Tab } from './Tab';
import { PrimaryTab } from './PrimaryTab';
import { SecondaryTab } from './SecondaryTab';

// https://m3.material.io/components/tabs/overview
// https://material-web.dev/components/tabs/
// https://github.com/material-components/material-web/blob/main/tabs/demo/stories.ts

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  icon: CalendarDaysIcon,
} satisfies Partial<ITabProps>;

const statesProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Enabled', children: 'Enabled' },
  { $legend: 'Focused', children: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', children: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', children: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', children: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Inactive' },
  { $legend: 'Active', active: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={() => (
        <React.Fragment>
          <PrimaryTab {...props}>Primary</PrimaryTab>
          <SecondaryTab {...props}>Secondary</SecondaryTab>
        </React.Fragment>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    active: true,
  },
};

export const Primary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PrimaryTab}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: defaultArgs,
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SecondaryTab}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: defaultArgs,
};

export default meta;
