import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faImage } from '@fortawesome/free-solid-svg-icons';

import { IAny } from '@/helpers/types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
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
  onClick: (...args) => sbHandleEvent('click', args, 1000),
  label: 'Chip',
} satisfies Partial<IChipProps>;

const states: Array<IComponentPresentation<IChipProps<IAny>>> = [
  {
    legend: 'Enabled',
    props: {
      label: 'Enabled',
    },
  },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Focused',
    props: { label: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', visualState: { pressed: true } },
  },
  { legend: 'Loading', props: { label: 'Loading', loading: true } },
  {
    legend: 'Loading text',
    props: {
      label: 'Loading',
      loading: true,
      loadingText: '…',
    },
  },
  { legend: 'Disabled', props: { label: 'Disabled', disabled: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Chip}
      props={props}
      cols={[
        {
          props: {
            variant: 'assist',
            label: 'Assist',
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
          },
        },
        {
          props: { variant: 'filter', label: 'Filter', selected: true },
        },
        {
          props: {
            variant: 'input',
            label: 'Input',
            onDelete: () => sbHandleEvent('delete', undefined, 300),
            imageUrl: IMAGE_URL,
          },
        },
        {
          props: {
            variant: 'input',
            label: 'Avatar',
            onDelete: () => sbHandleEvent('delete', undefined, 300),
            imageUrl: IMAGE_URL,
            avatar: true,
          },
        },
        {
          props: {
            variant: 'suggestion',
            label: 'Suggestion',
          },
        },
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
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'Elevated', props: { elevated: true } },
      ]}
      groups={[
        {},
        {
          legend: 'With Icon',
          props: { icon: <FontAwesomeIcon icon={faCalendarDays} /> },
        },
        { legend: 'With Image', props: { imageUrl: IMAGE_URL } },
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
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'Elevated', props: { elevated: true } },
      ]}
      groups={[{}, { legend: 'Selected', props: { selected: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filter',
  },
};

const StatefulChip: React.FC<IChipProps> = (props) => {
  const [selected, setSelected] = useState(false);

  return (
    <Chip
      {...props}
      selected={selected}
      onClick={() => setSelected(!selected)}
    />
  );
};

export const FilterStateful: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={StatefulChip}
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'Elevated', props: { elevated: true } },
      ]}
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
      cols={[
        ...states,
        { legend: 'Deleting', props: { label: 'Deleting', deleting: true } },
      ]}
      rows={[
        { legend: 'Basic', hiddenIndexes: [7] },
        {
          legend: 'Deletable',
          props: { onDelete: () => sbHandleEvent('delete', undefined, 300) },
        },
      ]}
      groups={[{}, { legend: 'Selected', props: { selected: true } }]}
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
      cols={[
        ...states,
        { legend: 'Deleting', props: { label: 'Deleting', deleting: true } },
      ]}
      rows={[
        {
          legend: 'With Icon',
          hiddenIndexes: [7],
          props: { icon: <FontAwesomeIcon icon={faImage} /> },
        },
        {
          legend: 'With Image',
          props: {
            imageUrl: IMAGE_URL,
            onDelete: () => sbHandleEvent('delete', undefined, 300),
          },
        },
        {
          legend: 'With avatar',
          props: {
            imageUrl: IMAGE_URL,
            onDelete: () => sbHandleEvent('delete', undefined, 300),
            avatar: true,
          },
        },
      ]}
      groups={[{}, { legend: 'Selected', props: { selected: true } }]}
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
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'Elevated', props: { elevated: true } },
      ]}
      groups={[
        {},
        {
          legend: 'With Icon',
          props: { icon: <FontAwesomeIcon icon={faCalendarDays} /> },
        },
        { legend: 'With Image', props: { imageUrl: IMAGE_URL } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'suggestion',
  },
};

export default meta;
