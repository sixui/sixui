import type { Meta, StoryObj } from '@storybook/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IStepProps } from './Step.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Step } from './Step';

const meta = {
  component: Step,
} satisfies Meta<typeof Step>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args, 1000),
} satisfies Partial<IStepProps>;

const rows: Array<IComponentPresentation<IStepProps>> = [
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

const cols: Array<IComponentPresentation<IStepProps>> = [
  { legend: 'Normal' },
  { legend: 'Completed', props: { completed: true } },
  { legend: 'Error', props: { hasError: true } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const groups: Array<IComponentPresentation<IStepProps>> = [
  { legend: 'Inactive' },
  { legend: 'Active', props: { active: true } },
];

const StepShowcase = componentShowcaseFactory(Step);

export const Variants: IStory = {
  render: (props) => (
    <StepShowcase
      props={props}
      cols={[
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
      ]}
    />
  ),
  args: defaultArgs,
};

export const RightLabel: IStory = {
  render: (props) => (
    <StepShowcase props={props} rows={rows} cols={cols} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'right',
  },
};

export const BottomLabel: IStory = {
  render: (props) => (
    <StepShowcase props={props} rows={rows} cols={cols} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    labelPosition: 'bottom',
  },
};

export default meta;
