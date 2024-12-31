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
  { legend: 'Basic' },
  {
    legend: 'With elements',
    props: {
      children: (
        <Card.Content>
          <Card.Title
            headline="Headline"
            subhead="Subhead"
            supportingText="Supporting text"
          />
        </Card.Content>
      ),
    },
  },
];

const CardDemo: React.FC<ICardProps> = ({ children, ...props }) => (
  <Card w="$48" h="$24" {...props}>
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
