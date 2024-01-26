import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { buttonVariants } from './Button.styledefs';
import { type IButtonProps, Button } from './Button';

// https://m3.material.io/components/buttons/overview
// https://material-web.dev/components/button/
// https://github.com/material-components/material-web/blob/main/button/demo/stories.ts

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (args) => sbHandleEvent('click', args),
  children: 'Button',
} satisfies Partial<IButtonProps>;

const statesProps: IComponentPropsWithLegend<IButtonProps> = [
  { $legend: 'Enabled', children: 'Enabled' },
  { $legend: 'Hovered', children: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', children: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', children: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Loading', children: 'Loading', loading: true },
  {
    $legend: 'Loading text',
    children: 'Loading',
    loading: true,
    loadingText: '…',
  },
  { $legend: 'Disabled', children: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IButtonProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Leading Icon', icon: PlusIcon },
  {
    $legend: 'With Leading and Trailing Icons',
    icon: PlusIcon,
    trailingIcon: true,
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Button}
      props={props}
      colsProps={buttonVariants.map((variant) => ({
        variant,
        children: capitalizeFirstLetter(variant),
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'text',
  },
};

export default meta;
