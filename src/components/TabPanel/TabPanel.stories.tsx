import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ITabPanelProps } from './TabPanel.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { TabPanel } from './TabPanel';

const meta = {
  component: TabPanel,
} satisfies Meta<typeof TabPanel>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'TabPanel',
} satisfies Partial<ITabPanelProps>;

const variants: Array<IComponentPresentation<ITabPanelProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ITabPanelProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const TabPanelShowcase = componentShowcaseFactory(TabPanel);

export const Basic: IStory = {
  render: (props) => (
    <TabPanelShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
