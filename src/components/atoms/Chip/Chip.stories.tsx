import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CalendarDaysIcon, PhotoIcon } from '@heroicons/react/20/solid';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { type IChipProps, Chip } from './Chip';

// https://m3.material.io/components/chips/overview
// https://material-web.dev/components/chip/
// https://github.com/material-components/material-web/blob/main/chips/demo/stories.ts

const IMAGE_URL =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=64&h=64&q=80';

const meta = {
  component: Chip,
} satisfies Meta<typeof Chip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (args) => sbHandleEvent('click', args),
  label: 'Chip',
} satisfies Partial<IChipProps>;

const statesProps: IComponentPropsWithLegend<IChipProps> = [
  { $legend: 'Enabled', label: 'Enabled' },
  { $legend: 'Hovered', label: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', label: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', label: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Loading', label: 'Loading', loading: true },
  {
    $legend: 'Loading text',
    label: 'Loading',
    loading: true,
    loadingText: '…',
  },
  { $legend: 'Disabled', label: 'Disabled', disabled: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={[
        {
          variant: 'assist',
          label: 'Assist',
          icon: CalendarDaysIcon,
        },
        { variant: 'filter', label: 'Filter', defaultSelected: true },
        {
          variant: 'input',
          label: 'Input',
          onDelete: () => sbHandleEvent('delete'),
          imageUrl: IMAGE_URL,
        },
        {
          variant: 'input',
          label: 'Avatar',
          onDelete: () => sbHandleEvent('delete'),
          imageUrl: IMAGE_URL,
          avatar: true,
        },
        { variant: 'suggestion', label: 'Suggestion' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Assist: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Basic' },
        { $legend: 'Elevated', elevated: true },
      ]}
      groupsProps={[
        {},
        { $legend: 'With icon', icon: CalendarDaysIcon },
        { $legend: 'With image', imageUrl: IMAGE_URL },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'assist',
  },
};

export const Filter: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Basic' },
        { $legend: 'Elevated', elevated: true },
      ]}
      groupsProps={[{}, { $legend: 'Selected', defaultSelected: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filter',
  },
};

export const Input: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={[
        ...statesProps,
        { $legend: 'Deleting', label: 'Deleting', deleting: true },
      ]}
      rowsProps={[
        { $legend: 'Basic' },
        { $legend: 'Deletable', onDelete: () => sbHandleEvent('delete') },
      ]}
      groupsProps={[{}, { $legend: 'Selected', defaultSelected: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'input',
  },
};

export const InputWithIconOrImage: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={[
        ...statesProps,
        { $legend: 'Deleting', label: 'Deleting', deleting: true },
      ]}
      rowsProps={[
        { $legend: 'With icon', icon: PhotoIcon },
        {
          $legend: 'With image',
          imageUrl: IMAGE_URL,
          onDelete: () => sbHandleEvent('delete'),
        },
        {
          $legend: 'With avatar',
          imageUrl: IMAGE_URL,
          onDelete: () => sbHandleEvent('delete'),
          avatar: true,
        },
      ]}
      groupsProps={[{}, { $legend: 'Selected', defaultSelected: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'input',
  },
};

export const Suggestion: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Basic' },
        { $legend: 'Elevated', elevated: true },
      ]}
      groupsProps={[
        {},
        { $legend: 'With icon', icon: CalendarDaysIcon },
        { $legend: 'With image', imageUrl: IMAGE_URL },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'suggestion',
  },
};

export default meta;
