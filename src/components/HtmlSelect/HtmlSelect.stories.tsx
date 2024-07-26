import type { Meta, StoryObj } from '@storybook/react';

import type { IHtmlSelectProps } from './HtmlSelect.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { HtmlSelect } from './HtmlSelect';

const meta = {
  component: HtmlSelect,
} satisfies Meta<typeof HtmlSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  options: [
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
  onChange: (...args) => void sbHandleEvent('change', ...args),
} satisfies Partial<IHtmlSelectProps>;

export const Basic: IStory = {
  render: (props) => <HtmlSelect {...props} />,
  args: defaultArgs,
};

export default meta;
