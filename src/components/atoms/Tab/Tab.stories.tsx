import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { type ITabProps, Tab } from './Tab';

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

const statesProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Enabled', label: 'Enabled' },
  { $legend: 'Focused', label: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', label: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', label: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', label: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Label' },
  {
    $legend: 'Icon',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    activeIcon: <FontAwesomeIcon icon={faEnvelopeSolid} />,
    label: undefined,
  },
  {
    $legend: 'Label and icon',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    activeIcon: <FontAwesomeIcon icon={faEnvelopeSolid} />,
  },
];

const groupsProps: IComponentPropsWithLegend<ITabProps> = [
  { $legend: 'Inactive' },
  { $legend: 'Active', active: true },
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
            label='Primary'
          />
          <Tab
            {...props}
            variant='secondary'
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            activeIcon={<FontAwesomeIcon icon={faEnvelopeSolid} />}
            label='Secondary'
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
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
    />
  ),
  args: defaultArgs,
};

export const PrimaryWithBadge: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tab}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
    badge: { value: 3 },
  },
};

export default meta;
