import type { Meta, StoryObj } from '@storybook/react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ITabProps } from './Tab.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Tab } from './Tab';

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<ITabProps>;

const TabShowcase = componentShowcaseFactory(Tab);

const states: Array<IComponentPresentation<ITabProps>> = [
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

const rows: Array<IComponentPresentation<ITabProps>> = [
  { legend: 'Label' },
  {
    legend: 'Icon',
    props: {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      activeIcon: <FontAwesomeIcon icon={faEnvelopeSolid} />,
      label: undefined,
    },
  },
  {
    legend: 'Label and icon',
    props: {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      activeIcon: <FontAwesomeIcon icon={faEnvelopeSolid} />,
    },
  },
];

const groups: Array<IComponentPresentation<ITabProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <TabShowcase
      cols={[
        {
          legend: 'Primary',
          props: {
            variant: 'primary',
            label: 'Primary',
          },
        },
        {
          legend: 'Secondary',
          props: {
            variant: 'secondary',
            label: 'Secondary',
          },
        },
      ]}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    active: true,
    badgeProps: { value: 3 },
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    activeIcon: <FontAwesomeIcon icon={faEnvelopeSolid} />,
  },
};

export const Primary: IStory = {
  render: (props) => (
    <TabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: defaultArgs,
};

export const PrimaryWithBadge: IStory = {
  render: (props) => (
    <TabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    badgeProps: { value: 3 },
  },
};

export const Secondary: IStory = {
  render: (props) => (
    <TabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const SecondaryWithBadge: IStory = {
  render: (props) => (
    <TabShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
    badgeProps: { value: 3 },
  },
};

export default meta;
