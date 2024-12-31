import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardProps, ICardVariant } from './Card.types';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600';

const defaultArgs = {
  w: '$72',
} satisfies Partial<ICardProps>;

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
          <Card.Media src={IMAGE_URL} h="$48" />
          <Card.Content>
            <Card.Title
              headline="Headline"
              subhead="Subhead"
              supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
            />
          </Card.Content>
          <Card.Actions>
            <Button variant="filled">Action</Button>
          </Card.Actions>
        </>
      ),
    },
  },
];

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
  args: {
    ...defaultArgs,
    h: '$32',
  },
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
