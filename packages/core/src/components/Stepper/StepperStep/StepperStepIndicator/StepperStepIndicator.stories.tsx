import type { Meta, StoryObj } from '@storybook/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IStepperStepIndicatorProps } from './StepperStepIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { StepperStepIndicator } from './StepperStepIndicator';

const meta = {
  component: StepperStepIndicator,
} satisfies Meta<typeof StepperStepIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  label: '1',
} satisfies Partial<IStepperStepIndicatorProps>;

const variants: Array<IComponentPresentation<IStepperStepIndicatorProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'With Icon',
    props: {
      icon: <FontAwesomeIcon icon={faGear} />,
    },
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
  },
];

const states: Array<IComponentPresentation<IStepperStepIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Completed', props: { completed: true } },
  { legend: 'Error', props: { hasError: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const groups: Array<IComponentPresentation<IStepperStepIndicatorProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

const StepperStepIndicatorShowcase =
  componentShowcaseFactory(StepperStepIndicator);

export const Basic: IStory = {
  render: (props) => (
    <StepperStepIndicatorShowcase
      props={props}
      cols={states}
      rows={variants}
      groups={groups}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <StepperStepIndicatorShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <StepperStepIndicatorShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
