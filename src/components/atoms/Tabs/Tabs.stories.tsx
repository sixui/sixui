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

import { type ITabsProps, Tabs } from './Tabs';
import { PrimaryTab, SecondaryTab } from '../Tab';
import { TabList } from '../TabList';
import { type ITabPanelProps, TabPanel } from '../TabPanel';
import { Divider } from '../Divider';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabsProps>;

const TabPanelDemo: React.FC<ITabPanelProps> = ({ children, ...props }) => (
  <TabPanel {...props}>
    <div style={{ padding: '16px' }}>{children}</div>
  </TabPanel>
);

interface ITabsDemoProps extends ITabsProps {
  tab: typeof PrimaryTab | typeof SecondaryTab;
}

const TabsDemo: React.FC<ITabsDemoProps> = ({ tab: Tab, ...props }) => (
  <div style={{ width: '400px' }}>
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
          icon={Cog6ToothIcon}
          activeIcon={ActiveCog6ToothIcon}
        />
      </TabList>
      <Divider />

      <TabPanelDemo anchor='tab-1'>Content A</TabPanelDemo>
      <TabPanelDemo anchor='tab-2'>Content B</TabPanelDemo>
      <TabPanelDemo anchor='tab-3'>Content C</TabPanelDemo>
    </Tabs>
  </div>
);

export const Standard: IStory = {
  render: (props) => <TabsDemo tab={PrimaryTab} {...props} />,
  args: defaultArgs,
};

export default meta;
