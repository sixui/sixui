import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CalendarDaysIcon as CalendarDaysIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon as ActiveCalendarDaysIcon } from '@heroicons/react/24/solid';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
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
  onClick: (args) => sbHandleEvent('click', args),
} satisfies Partial<ITabProps>;

const statesProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Enabled', label: 'Enabled' },
  { $legend: 'Focused', label: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', label: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', label: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', label: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Label' },
  {
    $legend: 'Icon',
    icon: CalendarDaysIcon,
    activeIcon: ActiveCalendarDaysIcon,
    label: undefined,
  },
  {
    $legend: 'Label and icon',
    icon: CalendarDaysIcon,
    activeIcon: ActiveCalendarDaysIcon,
  },
];

const groupsProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Inactive' },
  { $legend: 'Active', active: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={() => (
        <React.Fragment>
          <PrimaryTab
            {...props}
            icon={CalendarDaysIcon}
            activeIcon={ActiveCalendarDaysIcon}
            label='Primary'
          />
          <SecondaryTab
            {...props}
            icon={CalendarDaysIcon}
            activeIcon={ActiveCalendarDaysIcon}
            label='Secondary'
          />
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
      groupsProps={groupsProps}
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
      groupsProps={groupsProps}
    />
  ),
  args: defaultArgs,
};

export default meta;
