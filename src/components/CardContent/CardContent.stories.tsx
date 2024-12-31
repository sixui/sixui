import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardContentProps } from './CardContent.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { CardContent } from './CardContent';

const meta = {
  component: CardContent,
} satisfies Meta<typeof CardContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'CardContent',
} satisfies Partial<ICardContentProps>;

const states: Array<IComponentPresentation<ICardContentProps>> = [
  { legend: 'Normal' },
  {
    legend: 'Disabled',
    props: {
      modifiers: {
        disabled: true,
      },
    },
  },
];

const CardContentShowcase = componentShowcaseFactory(CardContent);

export const Basic: IStory = {
  render: (props) => <CardContentShowcase props={props} cols={states} />,
  args: defaultArgs,
};

export default meta;
