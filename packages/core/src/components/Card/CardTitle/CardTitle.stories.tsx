import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ICardTitleProps } from './CardTitle.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { CardTitle } from './CardTitle';

const meta = {
  component: CardTitle,
} satisfies Meta<typeof CardTitle>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  headline: 'Headline',
  subhead: 'Subhead',
  supportingText: 'Supporting Text',
} satisfies Partial<ICardTitleProps>;

const CardTitleShowcase = componentShowcaseFactory(CardTitle);

export const Basic: IStory = {
  render: (props) => <CardTitleShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
