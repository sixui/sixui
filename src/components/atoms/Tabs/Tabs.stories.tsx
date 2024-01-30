import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ComponentShowcase } from '@/components/molecules/ComponentShowcase';
import { Tabs, type ITabsProps } from './Tabs';
import { PrimaryTab } from '../Tab';
import { TabList } from '../TabList';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabsProps>;

const ControlledTabs: React.FC<ITabsProps> = (props) => {
  const [anchor, setAnchor] = React.useState<string | undefined>('tab-2');

  return (
    <Tabs {...props} anchor={anchor} onChange={setAnchor}>
      <TabList>
        <PrimaryTab label='Item one' anchor='tab-1' />
        <PrimaryTab label='Item two' anchor='tab-2' />
        <PrimaryTab label='Item three' anchor='tab-3' />
      </TabList>
    </Tabs>
  );
};

const UncontrolledTabs: React.FC<ITabsProps> = (props) => (
  <Tabs {...props} defaultAnchor='tab-2'>
    <TabList>
      <PrimaryTab label='Item one' anchor='tab-1' />
      <PrimaryTab label='Item two' anchor='tab-2' />
      <PrimaryTab label='Item three' anchor='tab-3' />
    </TabList>
  </Tabs>
);

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase component={ControlledTabs} props={props} />
  ),
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase component={UncontrolledTabs} props={props} />
  ),
  args: defaultArgs,
};

export default meta;
