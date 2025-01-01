import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICheckboxIndicatorProps } from './CheckboxIndicator.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { CheckboxIndicator } from './CheckboxIndicator';

const meta = {
  component: CheckboxIndicator,
} satisfies Meta<typeof CheckboxIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICheckboxIndicatorProps>;

const states: Array<IComponentPresentation<ICheckboxIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
  { legend: 'Loading', props: { loading: true } },
];

const CheckboxIndicatorShowcase = componentShowcaseFactory(CheckboxIndicator);

export const Scales: IStory = {
  render: (props) => (
    <CheckboxIndicatorShowcase
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
    <CheckboxIndicatorShowcase
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

export const Configurations: IStory = {
  render: (props) => (
    <CheckboxIndicatorShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Indeterminate', props: { indeterminate: true } },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
