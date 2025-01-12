import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IStepProps } from './Step.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Step } from './Step';

const meta = {
  component: Step,
} satisfies Meta<typeof Step>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Step',
} satisfies Partial<IStepProps>;

const variants: Array<IComponentPresentation<IStepProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IStepProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const StepShowcase = componentShowcaseFactory(Step);

export const Basic: IStory = {
  render: (props) => (
    <StepShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
