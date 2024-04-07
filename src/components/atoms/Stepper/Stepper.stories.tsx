import type { Meta, StoryObj } from '@storybook/react';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Stepper, type IStepperProps } from './Stepper';
import { createSequence } from '@olivierpascal/helpers';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
} satisfies Partial<IStepperProps>;

const rows: Array<IComponentPresentation<IStepperProps>> = [
  {
    legend: 'No label',
    props: {
      children: createSequence(3).map((index) => <Stepper.Step key={index} />),
    },
  },
  {
    legend: 'Label right',
    props: {
      labelPosition: 'right',
    },
  },
];

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={[
        ...rows,
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
    children: [
      <Stepper.Step key={0} label='Lorem ipsum' />,
      <Stepper.Step key={1} label='Lorem ipsum' supportingText='Supporting' />,
      <Stepper.Step key={2} label='Lorem ipsum' />,
    ],
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={rows}
      align='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    children: [
      <Stepper.Step key={0} label='Lorem ipsum' />,
      <Stepper.Step key={1} label='Lorem ipsum' supportingText='Supporting' />,
      <Stepper.Step key={2} label='Lorem ipsum' />,
    ],
  },
};

// FIXME:
// - with children
// - with text in connector
// - with different connector
// - handle state

export default meta;
