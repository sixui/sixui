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

const variants: Array<IComponentPresentation<IRadioProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IRadioProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const RadioShowcase = componentShowcaseFactory(Radio);

export const Basic: IStory = {
  render: (props) => (
    <RadioShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
