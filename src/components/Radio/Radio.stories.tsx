import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IRadioProps } from './Radio.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Radio } from './Radio';

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioProps>;

const states: Array<IComponentPresentation<IRadioProps>> = [
  { legend: 'Enabled' },
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
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const RadioShowcase = componentShowcaseFactory(Radio);

export const Basic: IStory = {
  render: (props) => <RadioShowcase props={props} cols={states} />,
  args: defaultArgs,
};

export default meta;
