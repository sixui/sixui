import type { Meta, StoryObj } from '@storybook/react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ITabProps } from './Tab.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ComponentShowcase } from '../ComponentShowcase';
import { Tab } from './Tab';

// https://m3.material.io/components/tabs/overview
// https://material-web.dev/components/tabs/
// https://github.com/material-components/material-web/blob/main/tabs/demo/stories.ts

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args),
} satisfies Partial<ITabProps>;

const states: Array<IComponentPresentation<ITabProps>> = [
  { legend: 'Enabled', props: { label: 'Enabled' } },
  {
    legend: 'Focused',
    props: { label: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', visualState: { pressed: true } },
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
    <ComponentShowcase
      component={() => (
        <>
          <Tab
            {...props}
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            activeIcon={<FontAwesomeIcon icon={faEnvelopeSolid} />}
            label="Primary"
          />
          <Tab
            {...props}
            variant="secondary"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            activeIcon={<FontAwesomeIcon icon={faEnvelopeSolid} />}
            label="Secondary"
          />
        </>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    active: true,
    badge: { value: 3 },
  },
};

export const Primary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
    />
  ),
  args: defaultArgs,
};

export const PrimaryWithBadge: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    badge: { value: 3 },
  },
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const SecondaryWithBadge: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      cols={states}
      rows={rows}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
    badge: { value: 3 },
  },
};

export default meta;
