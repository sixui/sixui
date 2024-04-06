import type { Meta, StoryObj } from '@storybook/react';

import { Stepper, type IStepperProps } from './Stepper';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
} satisfies Partial<IStepperProps>;

export const Basic: IStory = {
  render: (props) => (
    <Stepper {...props}>
      <Stepper.Step>Step 1</Stepper.Step>
      <Stepper.Step>Step 2</Stepper.Step>
      <Stepper.Step>Step 3</Stepper.Step>
    </Stepper>
  ),
  args: defaultArgs,
};

export default meta;
