import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICardProps } from './Card.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Card } from './Card';
import { cardVariants } from './Card.types';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$32',
  h: '$24',
} satisfies Partial<ICardProps>;

const states: Array<IComponentPresentation<ICardProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Interactive',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
    },
  },
  {
    legend: 'Dragged',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      interactions: { dragged: true },
    },
  },
  {
    legend: 'Focused',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      interactions: { focused: true },
    },
  },
  {
    legend: 'Hovered',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      interactions: { hovered: true },
    },
  },
  {
    legend: 'Pressed',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      interactions: { pressed: true },
    },
  },
  {
    legend: 'Dragged',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      interactions: { dragged: true },
    },
  },
  {
    legend: 'Disabled',
    props: {
      onClick: (...args) => sbHandleEvent('onClick', args),
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ICardProps>> = [{ legend: 'Basic' }];

const CardShowcase = componentShowcaseFactory(Card);

export const Variants: IStory = {
  render: (props) => (
    <CardShowcase
      props={props}
      cols={cardVariants.map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: { variant },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Elevated: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Outlined: IStory = {
  render: (props) => <CardShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
