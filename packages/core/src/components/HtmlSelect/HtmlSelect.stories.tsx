import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IHtmlSelectProps } from './HtmlSelect.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { HtmlSelect } from './HtmlSelect';

const meta = {
  component: HtmlSelect,
} satisfies Meta<typeof HtmlSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  items: [
    {
      label: 'Dog',
      value: 'dog',
    },
    {
      label: 'Cat',
      value: 'cat',
    },
    {
      label: 'Hamster',
      value: 'hamster',
    },
    {
      label: 'Parrot',
      value: 'parrot',
    },
    {
      label: 'Spider',
      value: 'spider',
    },
    {
      label: 'Goldfish',
      value: 'goldfish',
    },
  ],
  onChange: (...args) => void sbHandleEvent('onChange', ...args),
  w: '$96',
} satisfies Partial<IHtmlSelectProps>;

const states: Array<IComponentPresentation<IHtmlSelectProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const HtmlSelectShowcase = componentShowcaseFactory(HtmlSelect);

export const Basic: IStory = {
  render: (props) => <HtmlSelectShowcase props={props} rows={states} />,
  args: defaultArgs,
};

export default meta;
