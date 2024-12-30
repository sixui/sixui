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
  onClick: (...args) => sbHandleEvent('click', args, 1000),
} satisfies Partial<IChipProps>;

const states: Array<IComponentPresentation<IChipProps>> = [
  {
    legend: 'Non-interactive',
    props: {
      children: 'Non-interactive',
      nonInteractive: true,
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
            children: 'Assist',
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
          },
        },
        {
          props: { variant: 'filter', children: 'Filter', selected: true },
        },
        {
          props: {
            variant: 'input',
            children: 'Input',
            onDelete: () => sbHandleEvent('delete', undefined, 1000),
            imageUrl: IMAGE_URL,
          },
        },
        {
          props: {
            variant: 'input',
            children: 'Avatar',
            onDelete: () => sbHandleEvent('delete', undefined, 1000),
            imageUrl: IMAGE_URL,
            avatar: true,
          },
        },
        {
          props: {
            variant: 'suggestion',
            children: 'Suggestion',
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

export const Scales: IStory = {
  render: (props) => (
    <ChipShowcase
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
    variant: 'assist',
    children: 'Assist',
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
  },
};

export const Densities: IStory = {
  render: (props) => (
    <ChipShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'assist',
    children: 'Assist',
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
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
        { legend: 'Deleting', props: { children: 'Deleting', deleting: true } },
      ]}
      rows={[
        { legend: 'Basic', hiddenIndexes: [8] },
        {
          legend: 'Deletable',
          props: { onDelete: () => sbHandleEvent('delete', undefined, 1000) },
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
        { legend: 'Deleting', props: { children: 'Deleting', deleting: true } },
      ]}
      rows={[
        {
          legend: 'With Icon',
          hiddenIndexes: [8],
          props: { icon: <FontAwesomeIcon icon={faImage} /> },
        },
        {
          legend: 'With Image',
          props: {
            imageUrl: IMAGE_URL,
            onDelete: () => sbHandleEvent('delete', undefined, 1000),
          },
        },
        {
          legend: 'With avatar',
          props: {
            imageUrl: IMAGE_URL,
            onDelete: () => sbHandleEvent('delete', undefined, 1000),
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
