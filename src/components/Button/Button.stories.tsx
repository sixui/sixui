import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IButtonOwnProps, IButtonVariant } from './Button.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '~/components/ComponentShowcase';
import { Button } from './Button';

// https://m3.material.io/components/buttons/overview
// https://material-web.dev/components/button/
// https://github.com/material-components/material-web/blob/main/button/demo/stories.ts

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args, 1000),
  children: 'Button',
} satisfies Partial<IButtonOwnProps>;

const states: Array<IComponentPresentation<IButtonOwnProps>> = [
  {
    legend: 'Enabled',
    props: {
      children: 'Enabled',
    },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Focused',
    props: { children: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', visualState: { pressed: true } },
  },
  { legend: 'Loading', props: { children: 'Loading', loading: true } },
  {
    legend: 'Loading text',
    props: {
      children: 'Loading',
      loading: true,
      loadingText: '…',
    },
  },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IButtonOwnProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With leading icon',
    props: { icon: <FontAwesomeIcon icon={faPlus} /> },
  },
  {
    legend: 'With trailing icon',
    props: {
      icon: <FontAwesomeIcon icon={faPlus} />,
      trailingIcon: true,
    },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={(
        [
          'elevated',
          'filled',
          'filledTonal',
          'outlined',
          'text',
          'danger',
          'snackbar',
        ] as Array<IButtonVariant>
      ).map((variant) => ({
        props: {
          variant,
          children: capitalizeFirstLetter(variant),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Elevated: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const FilledTonal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filledTonal',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export const Text: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'text',
  },
};

export const Danger: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'danger',
  },
};

export const Snackbar: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'snackbar',
  },
};

export default meta;
