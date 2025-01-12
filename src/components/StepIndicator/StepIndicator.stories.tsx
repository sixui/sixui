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
  { legend: 'Inactive', props: { inactive: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const groups: Array<IComponentPresentation<IStepIndicatorProps>> = [
  { legend: 'Active', props: { inactive: false } },
  { legend: 'Inactive', props: { inactive: true } },
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

export default meta;
