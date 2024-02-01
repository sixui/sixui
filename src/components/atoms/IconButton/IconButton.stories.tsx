import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon as SelectedCog6ToothIcon } from '@heroicons/react/24/solid';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { IconButton, type IIconButtonProps } from './IconButton';
import { iconbuttonVariants } from './IconButton.styledefs';

// https://m3.material.io/components/icon-buttons/overview
// https://material-web.dev/components/icon-button/
// https://github.com/material-components/material-web/blob/main/iconbutton/demo/stories.ts

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (args) => sbHandleEvent('click', args),
  icon: Cog6ToothIcon,
  selectedIcon: SelectedCog6ToothIcon,
} satisfies Partial<IIconButtonProps>;

const statesProps: IComponentPropsWithLegend<IIconButtonProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Loading', loading: true },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IIconButtonProps> = [
  { $legend: 'Basic', toggle: false },
  { $legend: 'Selectable', toggle: true },
  { $legend: 'Selected', toggle: true, selected: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      colsProps={iconbuttonVariants.map((variant) => ({ variant }))}
    />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'standard',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
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
      component={IconButton}
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
      component={IconButton}
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

export default meta;
