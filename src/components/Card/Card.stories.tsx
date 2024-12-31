import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ICardProps, ICardVariant } from './Card.types';
import {
  componentShowcaseFactory,
  IComponentPresentation,
} from '../ComponentShowcase';
import { Text } from '../Text';
import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600';

const defaultArgs = {} satisfies Partial<ICardProps>;

const states: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'Non-interactive', props: { nonInteractive: true } },
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

const rows: Array<IComponentPresentation<ICardProps>> = [
  {
    legend: 'Basic',
    props: {
      h: '$32',
    },
  },
  {
    legend: 'With elements',
    props: {
      children: (
        <>
          <Card.Media src={IMAGE_URL} h="$32" />
          <Card.Content>
            <Card.Title
              headline="Headline"
              subhead="Subhead"
              supportingText="Supporting text"
            />
          </Card.Content>
        </>
      ),
    },
  },
];

const CardDemo: React.FC<ICardProps> = ({ children, ...props }) => (
  <Card w="$48" {...props}>
    {children}
  </Card>
);

const CardDemoShowcase = componentShowcaseFactory(CardDemo);

export const Variants: IStory = {
  render: (props) => (
    <CardDemoShowcase
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
  render: (props) => (
    <CardDemoShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Elevated: IStory = {
  render: (props) => (
    <CardDemoShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <CardDemoShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
