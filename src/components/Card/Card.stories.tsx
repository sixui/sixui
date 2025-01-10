import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardProps, ICardVariant } from './Card.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Card } from './Card';

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
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<ICardProps>> = [{ legend: 'Basic' }];

const CardShowcase = componentShowcaseFactory(Card);

export const Variants: IStory = {
  render: (props) => (
    <CardShowcase
      props={props}
      cols={(['filled', 'elevated', 'outlined'] as Array<ICardVariant>).map(
        (variant) => ({
          legend: capitalizeFirstLetter(variant),
          props: { variant },
        }),
      )}
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
