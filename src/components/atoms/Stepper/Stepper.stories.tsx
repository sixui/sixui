import type { Meta, StoryObj } from '@storybook/react';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Stepper, type IStepperProps } from './Stepper';
import { Divider } from '@/components/atoms/Divider';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
} satisfies Partial<IStepperProps>;

const rows: Array<IComponentPresentation<IStepperProps>> = [
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
];

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={rows}
      fullWidth
    />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'bottom',
    children: [
      <Stepper.Step key={1} label='Lorem ipsum' />,
      <Stepper.Step key={2} label='Lorem ipsum' supportingText='Supporting' />,
      <Stepper.Step key={3} label='Lorem ipsum' />,
    ],
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <ComponentShowcase component={Stepper} props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'right',
    orientation: 'vertical',
    children: [
      <Stepper.Step key={1} label='Lorem ipsum' />,
      <Stepper.Step key={2} label='Lorem ipsum' supportingText='Supporting' />,
      <Stepper.Step key={3} label='Lorem ipsum' />,
    ],
  },
};

export default meta;
