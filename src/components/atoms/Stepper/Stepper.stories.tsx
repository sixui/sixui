import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Stepper, type IStepperProps } from './Stepper';
import { createSequence } from '@olivierpascal/helpers';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
} satisfies Partial<IStepperProps>;

const stepsWithLabel = [
  <Stepper.Step key={0} label='Lorem ipsum' />,
  <Stepper.Step key={1} label='Lorem ipsum' supportingText='Supporting' />,
  <Stepper.Step key={2} label='Lorem ipsum' />,
];

const stepsWithContent = [
  <Stepper.Step key={0} label='Lorem ipsum'>
    Lorem ipsum dolor sit amet.
  </Stepper.Step>,
  <Stepper.Step key={1} label='Lorem ipsum' supportingText='Supporting'>
    Lorem ipsum dolor sit amet.
  </Stepper.Step>,
  <Stepper.Step key={2} label='Lorem ipsum'>
    Lorem ipsum dolor sit amet.
  </Stepper.Step>,
];

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={[
        {
          legend: 'No label',
          props: {
            children: createSequence(3).map((index) => (
              <Stepper.Step key={index} />
            )),
          },
        },
        {
          legend: 'Label right',
          props: {
            labelPosition: 'right',
          },
        },
        {
          legend: 'Label bottom',
          props: {
            labelPosition: 'bottom',
          },
        },
      ]}
      fullWidth
    />
  ),
  args: {
    ...defaultArgs,
    children: stepsWithLabel,
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={[
        {
          legend: 'No label',
          props: {
            children: createSequence(3).map((index) => (
              <Stepper.Step key={index} />
            )),
          },
        },
        {
          legend: 'Label right',
          props: {
            labelPosition: 'right',
          },
        },
      ]}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With content',
          props: {
            children: stepsWithContent,
          },
        },
      ]}
      align='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    children: stepsWithLabel,
  },
};

// FIXME:
// - with icons
// - with text in connector
// - with different connector
// - handle state
// - add style vars

export default meta;
