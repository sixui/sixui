import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import stylex from '@stylexjs/stylex';
import {
  CalendarDaysIcon,
  PhotoIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  CalendarDaysIcon as ActiveCalendarDaysIcon,
  PhotoIcon as ActivePhotoIcon,
  ChartPieIcon as ActiveChartPieIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
} from '@heroicons/react/24/solid';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { type ITabsProps, Tabs } from './Tabs';
import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { type ITabPanelProps, TabPanel } from '../TabPanel';
import { Typography } from '../Typography';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabsProps>;

const styles = stylex.create({
  tabPanel: {
    padding: '16px',
    color: colorRolesVars.onSurface,
  },
});

const TabPanelDemo: React.FC<ITabPanelProps> = ({ children, ...props }) => (
  <TabPanel {...props}>
    <div {...stylex.props(styles.tabPanel)}>
      <Typography>{children}</Typography>
    </div>
  </TabPanel>
);

const TabsDemo: React.FC<ITabsProps> = (props) => (
  <div style={{ width: '600px' }}>
    <Tabs {...props} defaultAnchor={'tab-2'}>
      <TabList aria-label='Tabs example'>
        <Tab
          label='Item one'
          anchor='tab-1'
          icon={CalendarDaysIcon}
          activeIcon={ActiveCalendarDaysIcon}
        />
        <Tab
          label='Item two'
          anchor='tab-2'
          icon={PhotoIcon}
          activeIcon={ActivePhotoIcon}
        />
        <Tab
          label='Item three'
          anchor='tab-3'
          icon={ChartPieIcon}
          activeIcon={ActiveChartPieIcon}
        />
        <Tab
          label='Item four'
          anchor='tab-4'
          icon={Cog6ToothIcon}
          activeIcon={ActiveCog6ToothIcon}
          disabled
        />
      </TabList>

      <TabPanelDemo anchor='tab-1'>Content A</TabPanelDemo>
      <TabPanelDemo anchor='tab-2'>Content B</TabPanelDemo>
      <TabPanelDemo anchor='tab-3'>Content C</TabPanelDemo>
      <TabPanelDemo anchor='tab-4'>Content D</TabPanelDemo>
    </Tabs>
  </div>
);

export const Primary: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export const Secondary: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export default meta;
