import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardProps } from './Card.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Card } from './Card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Card',
} satisfies Partial<ICardProps>;

const variants: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ICardProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const CardShowcase = componentShowcaseFactory(Card);

export const Basic: IStory = {
  render: (props) => (
    <CardShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
