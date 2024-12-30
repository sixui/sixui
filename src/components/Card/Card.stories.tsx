import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ICardProps, ICardVariant } from './Card.types';
import { CardTitle } from '../CardTitle';
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

const defaultArgs = {
  children: 'Card',
  href: 'https://google.fr',
} satisfies Partial<ICardProps>;

const states: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'Non-interactive', props: { nonInteractive: true } },
  {
    legend: 'Normal',
    props: { children: 'Normal' },
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
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With title',
    props: { children: <CardTitle headline="Headline" /> },
  },
];

const CardDemo: React.FC<ICardProps> = ({ children, ...props }) => (
  <Card w="$32" h="$24" {...props}>
    <Text>{children}</Text>
  </Card>
);

const CardDemoShowcase = componentShowcaseFactory(CardDemo);

export const Variants: IStory = {
  render: (props) => (
    <CardDemoShowcase
      props={props}
      cols={(['filled', 'elevated', 'outlined'] as Array<ICardVariant>).map(
        (variant) => ({
          props: {
            variant,
            children: capitalizeFirstLetter(variant),
          },
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
