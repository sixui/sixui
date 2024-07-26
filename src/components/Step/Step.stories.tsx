import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import type { IStepProps } from './Step.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '~/components/ComponentShowcase';
import { Step } from './Step';

const meta = {
  component: Step,
} satisfies Meta<typeof Step>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepProps>;

const rows: Array<IComponentPresentation<IStepProps>> = [
  {
    legend: 'Basic',
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
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
      children: 'x',
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
  {
    legend: 'Not completed',
  },
  {
    legend: 'Completed',
    props: {
      completed: true,
    },
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const groups: Array<IComponentPresentation<IStepProps>> = [
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

export const NonInteractive: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Step}
      props={props}
      rows={rows}
      cols={cols}
      groups={groups}
    />
  ),
  args: defaultArgs,
};

export const Interactive: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Step}
      props={props}
      rows={rows}
      cols={cols}
      groups={groups}
    />
  ),
  args: {
    ...defaultArgs,
    onClick: (...args) => void sbHandleEvent('click', args),
  },
};

export default meta;
