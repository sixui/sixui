import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICardMediaProps } from './CardMedia.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { CardMedia } from './CardMedia';

const meta = {
  component: CardMedia,
} satisfies Meta<typeof CardMedia>;

type IStory = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=600';

const defaultArgs = {
  src: IMAGE_URL,
  w: '$48',
  h: '$48',
} satisfies Partial<ICardMediaProps>;

const states: Array<IComponentPresentation<ICardMediaProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Disabled',
    props: { disabled: true },
  },
];

const CardMediaShowcase = componentShowcaseFactory(CardMedia);

export const Basic: IStory = {
  render: (props) => <CardMediaShowcase props={props} cols={states} />,
  args: defaultArgs,
};

export default meta;
