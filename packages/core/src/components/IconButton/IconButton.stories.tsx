import type { Meta, StoryObj } from '@storybook/react';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IIconButtonProps, IIconButtonVariant } from './IconButton.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IconButton } from './IconButton';

// https://m3.material.io/components/icon-buttons/overview
// https://material-web.dev/components/icon-button/
// https://github.com/material-components/material-web/blob/main/iconbutton/demo/stories.ts

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  icon: <FontAwesomeIcon icon={faHeart} />,
  selectedIcon: <FontAwesomeIcon icon={fasHeart} />,
} satisfies Partial<IIconButtonProps>;

const states: Array<IComponentPresentation<IIconButtonProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IIconButtonProps>> = [
  { legend: 'Basic', props: { toggle: false } },
  { legend: 'Togglable', props: { toggle: true } },
  { legend: 'Toggled', props: { toggle: true, selected: true } },
];

const IconButtonShowcase = componentShowcaseFactory(IconButton);

export const Variants: IStory = {
  render: (props) => (
    <IconButtonShowcase
      verticalAlign="center"
      props={props}
      cols={(
        [
          'standard',
          'filled',
          'filledTonal',
          'outlined',
          'danger',
          'snackbar',
        ] as Array<IIconButtonVariant>
      ).map((variant) => ({ props: { variant } }))}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <IconButtonShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Densities: IStory = {
  render: (props) => (
    <IconButtonShowcase
      props={props}
      cols={[
        { legend: '-4', props: { density: -4 } },
        { legend: '-3', props: { density: -3 } },
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Standard: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'standard',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const FilledTonal: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'filledTonal',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export const Danger: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'danger',
  },
};

export const Snackbar: IStory = {
  render: (props) => (
    <IconButtonShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'snackbar',
  },
};

export default meta;
