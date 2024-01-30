import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  CalendarDaysIcon,
  PhotoIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  CalendarDaysIcon as ActiveCalendarDaysIcon,
  PhotoIcon as ActivePhotoIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
} from '@heroicons/react/24/solid';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { TabList, type ITabListProps } from './TabList';
import { type ITabProps, Tab } from '../Tab/Tab';

const meta = {
  component: TabList,
} satisfies Meta<typeof TabList>;

type IStory = StoryObj<typeof meta>;

type IExtendedTabListProps = ITabListProps &
  Pick<ITabProps, 'variant'> & {
    hasIcon?: boolean;
    hasLabel?: boolean;
  };

const defaultArgs = {} satisfies Partial<ITabListProps>;

const rowsProps: IComponentPropsWithLegend<IExtendedTabListProps> = [
  {
    $legend: 'Label',
    hasLabel: true,
  },
  {
    $legend: 'Icon',
    hasIcon: true,
  },
  {
    $legend: 'Label and icon',
    hasLabel: true,
    hasIcon: true,
  },
];

const TabListDemo: React.FC<IExtendedTabListProps> = ({
  hasIcon,
  hasLabel,
  variant,
  ...props
}) => (
  <TabList {...props}>
    <Tab
      label={hasLabel ? 'Item one' : undefined}
      icon={hasIcon ? CalendarDaysIcon : undefined}
      activeIcon={hasIcon ? ActiveCalendarDaysIcon : undefined}
      variant={variant}
      active
    />
    <Tab
      label={hasLabel ? 'Item two' : undefined}
      icon={hasIcon ? PhotoIcon : undefined}
      activeIcon={hasIcon ? ActivePhotoIcon : undefined}
      variant={variant}
    />
    <Tab
      label={hasLabel ? 'Item three' : undefined}
      icon={hasIcon ? Cog6ToothIcon : undefined}
      activeIcon={hasIcon ? ActiveCog6ToothIcon : undefined}
      variant={variant}
      disabled
    />
  </TabList>
);

export const Primary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabListDemo variant='primary' {...props} />}
      props={props}
      rowsProps={rowsProps}
      align='start'
    />
  ),
  args: defaultArgs,
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabListDemo variant='secondary' {...props} />}
      props={props}
      rowsProps={rowsProps}
      align='start'
    />
  ),
  args: defaultArgs,
};

export default meta;
