import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { faCalendarDays, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IChipProps } from './Chip.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Chip } from './Chip';

// https://m3.material.io/components/chips/overview
// https://material-web.dev/components/chip/
// https://github.com/material-components/material-web/blob/main/chips/demo/stories.ts

const IMAGE_URL = 'https://avatars.githubusercontent.com/u/2182039';

const meta = {
  component: Chip,
} satisfies Meta<typeof Chip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Chip',
  onClick: (...args) => sbHandleEvent('click', args, 1000),
} satisfies Partial<IChipProps>;

const states: Array<IComponentPresentation<IChipProps>> = [
  {
    legend: 'Static',
    props: {
      children: 'Static',
      onClick: undefined,
    },
  },
  {
    legend: 'Enabled',
    props: {
      children: 'Enabled',
    },
  },
  {
    legend: 'Focused',
    props: { children: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', interactions: { pressed: true } },
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

const ChipShowcase = componentShowcaseFactory(Chip);

export const Variants: IStory = {
  render: (props) => (
    <ChipShowcase
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
  args: {
    ...defaultArgs,
    onClick: (...args) => sbHandleEvent('click', args, 1000),
  },
};

export const Assist: IStory = {
  render: (props) => (
    <ChipShowcase
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
        {
          legend: 'With Avatar',
          props: {
            imageUrl: IMAGE_URL,
            avatar: true,
          },
        },
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
    <ChipShowcase
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
      onClick={props.onClick ? () => setSelected(!selected) : undefined}
    />
  );
};

const StatefulChipShowcase = componentShowcaseFactory(StatefulChip);

export const FilterStateful: IStory = {
  render: (props) => (
    <StatefulChipShowcase
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
    <ChipShowcase
      props={props}
      cols={[
        ...states,
        { legend: 'Deleting', props: { label: 'Deleting', deleting: true } },
      ]}
      rows={[
        { legend: 'Basic', hiddenIndexes: [8] },
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

export const InputStateful: IStory = {
  render: (props) => (
    <StatefulChipShowcase
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
    variant: 'input',
  },
};

export const InputWithIconOrImage: IStory = {
  render: (props) => (
    <ChipShowcase
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
    <ChipShowcase
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
