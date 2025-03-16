import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { INativeSelectControlProps } from './NativeSelectControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { NativeSelectControl } from './NativeSelectControl';

const meta = {
  component: NativeSelectControl,
} satisfies Meta<typeof NativeSelectControl>;

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
  w: '256px',
} satisfies Partial<INativeSelectControlProps>;

const states: Array<IComponentPresentation<INativeSelectControlProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const NativeSelectControlShowcase =
  componentShowcaseFactory(NativeSelectControl);

export const Basic: IStory = {
  render: (props) => (
    <NativeSelectControlShowcase props={props} rows={states} />
  ),
  args: defaultArgs,
};

export default meta;
