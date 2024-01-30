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

import { ComponentShowcase } from '@/components/molecules/ComponentShowcase';
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
  controlled?: boolean;
  tab: typeof PrimaryTab | typeof SecondaryTab;
}

const TabsDemo: React.FC<ITabsDemoProps> = ({
  controlled,
  tab: Tab,
  ...props
}) => {
  const [anchor, setAnchor] = React.useState<string | undefined>('tab-2');

  return (
    <div style={{ width: '100%' }}>
      <Tabs
        {...props}
        anchor={controlled ? anchor : undefined}
        onChange={controlled ? setAnchor : undefined}
        defaultAnchor={controlled ? undefined : 'tab-2'}
      >
        <TabList>
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
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabsDemo {...props} controlled />}
      props={props as ITabsDemoProps}
      rowsProps={[
        { $legend: 'Primary', tab: PrimaryTab },
        { $legend: 'Secondary', tab: SecondaryTab },
      ]}
      fullWidth
    />
  ),
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabsDemo {...props} />}
      props={props as ITabsDemoProps}
      rowsProps={[
        { $legend: 'Primary', tab: PrimaryTab },
        { $legend: 'Secondary', tab: SecondaryTab },
      ]}
      fullWidth
    />
  ),
  args: defaultArgs,
};

export default meta;
