import type { Meta, StoryObj } from '@storybook/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IStepperStepProps } from './StepperStep.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { StepperStep } from './StepperStep';

const meta = {
  component: StepperStep,
} satisfies Meta<typeof StepperStep>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args, 1000),
} satisfies Partial<IStepperStepProps>;

const variants: Array<IComponentPresentation<IStepperStepProps>> = [
  {
    legend: 'Right label',
    props: {
      labelPosition: 'right',
    },
  },
  {
    legend: 'Bottom label',
    props: {
      labelPosition: 'bottom',
    },
  },
];

const rows: Array<IComponentPresentation<IStepperStepProps>> = [
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
    legend: 'With Label',
    props: {
      label: 'Lorem ipsum',
    },
  },
  {
    legend: 'With Supporting Text',
    props: {
      label: 'Lorem ipsum',
      supportingText: 'Lorem ipsum',
    },
  },
];

const cols: Array<IComponentPresentation<IStepperStepProps>> = [
  { legend: 'Normal' },
  { legend: 'Completed', props: { completed: true } },
  { legend: 'Error', props: { hasError: true } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const groups: Array<IComponentPresentation<IStepperStepProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

const StepperStepShowcase = componentShowcaseFactory(StepperStep);

export const Variants: IStory = {
  render: (props) => <StepperStepShowcase props={props} cols={variants} />,
  args: {
    ...defaultArgs,
    label: 'Lorem ipsum',
    supportingText: 'Lorem ipsum',
  },
};

export const RightLabel: IStory = {
  render: (props) => (
    <StepperStepShowcase
      props={props}
      rows={rows}
      cols={cols}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'right',
  },
};

export const BottomLabel: IStory = {
  render: (props) => (
    <StepperStepShowcase
      props={props}
      rows={rows}
      cols={cols}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'bottom',
  },
};

export const Scales: IStory = {
  render: (props) => (
    <StepperStepShowcase
      props={props}
      rows={variants}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'Lorem ipsum',
    supportingText: 'Lorem ipsum',
  },
};

export const Densities: IStory = {
  render: (props) => (
    <StepperStepShowcase
      props={props}
      rows={variants}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'Lorem ipsum',
    supportingText: 'Lorem ipsum',
  },
};

export default meta;
