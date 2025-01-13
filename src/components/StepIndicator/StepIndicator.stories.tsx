import type { Meta, StoryObj } from '@storybook/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IStepIndicatorProps } from './StepIndicator.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { StepIndicator } from './StepIndicator';

const meta = {
  component: StepIndicator,
} satisfies Meta<typeof StepIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  label: '1',
} satisfies Partial<IStepIndicatorProps>;

const variants: Array<IComponentPresentation<IStepIndicatorProps>> = [
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

const states: Array<IComponentPresentation<IStepIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Completed', props: { completed: true } },
  { legend: 'Error', props: { hasError: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const groups: Array<IComponentPresentation<IStepIndicatorProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

const StepIndicatorShowcase = componentShowcaseFactory(StepIndicator);

export const Basic: IStory = {
  render: (props) => (
    <StepIndicatorShowcase
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
    <StepIndicatorShowcase
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
    <StepIndicatorShowcase
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
