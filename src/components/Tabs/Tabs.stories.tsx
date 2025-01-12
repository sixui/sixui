import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ITabsProps } from './Tabs.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Tabs } from './Tabs';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Tabs',
} satisfies Partial<ITabsProps>;

const variants: Array<IComponentPresentation<ITabsProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ITabsProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const TabsShowcase = componentShowcaseFactory(Tabs);

export const Basic: IStory = {
  render: (props) => (
    <TabsShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
