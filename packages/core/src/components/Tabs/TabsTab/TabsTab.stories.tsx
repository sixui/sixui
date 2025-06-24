import type { Meta, StoryObj } from '@storybook/react-vite';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ITabsTabProps } from './TabsTab.types';
import { Badge } from '~/components/Badge';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { TabsTab } from './TabsTab';
import { tabsTabVariants } from './TabsTab.types';

const meta = {
  component: TabsTab,
} satisfies Meta<typeof TabsTab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<ITabsTabProps>;

const TabsTabShowcase = componentShowcaseFactory(TabsTab);

const states: Array<IComponentPresentation<ITabsTabProps>> = [
  { legend: 'Enabled', props: { label: 'Enabled' } },
  {
    legend: 'Focused',
    props: { label: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', interactions: { pressed: true } },
  },
  { legend: 'Disabled', props: { label: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<ITabsTabProps>> = [
  { legend: 'Label' },
  {
    legend: 'Icon',
    props: {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      activeIcon: <FontAwesomeIcon icon={fasEnvelope} />,
      label: undefined,
    },
  },
  {
    legend: 'Label and icon',
    props: {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      activeIcon: <FontAwesomeIcon icon={fasEnvelope} />,
    },
  },
];

const groups: Array<IComponentPresentation<ITabsTabProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <TabsTabShowcase
      cols={tabsTabVariants.map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: { variant, label: capitalizeFirstLetter(variant) },
      }))}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    active: true,
    badge: <Badge value={3} />,
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    activeIcon: <FontAwesomeIcon icon={fasEnvelope} />,
  },
};

export const Primary: IStory = {
  render: (props) => (
    <TabsTabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: defaultArgs,
};

export const PrimaryWithBadge: IStory = {
  render: (props) => (
    <TabsTabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    badge: <Badge value={3} />,
  },
};

export const Secondary: IStory = {
  render: (props) => (
    <TabsTabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const SecondaryWithBadge: IStory = {
  render: (props) => (
    <TabsTabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
    badge: <Badge value={3} />,
  },
};

export default meta;
