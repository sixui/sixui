import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardActionsProps } from './CardActions.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { CardActions } from './CardActions';

const meta = {
  component: CardActions,
} satisfies Meta<typeof CardActions>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'CardActions',
} satisfies Partial<ICardActionsProps>;

const states: Array<IComponentPresentation<ICardActionsProps>> = [
  { legend: 'Normal' },
];

const CardActionsShowcase = componentShowcaseFactory(CardActions);

export const Basic: IStory = {
  render: (props) => <CardActionsShowcase props={props} cols={states} />,
  args: defaultArgs,
};

export default meta;
