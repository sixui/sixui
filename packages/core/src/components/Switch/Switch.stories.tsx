import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISwitchProps } from './Switch.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Switch } from './Switch';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
  label: 'Dark mode',
  supportingText: 'Enhance readability at night',
} satisfies Partial<ISwitchProps>;

const cols: Array<IComponentPresentation<ISwitchProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
      errorText: 'An error occurred.',
    },
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const SwitchShowcase = componentShowcaseFactory(Switch);

export const Basic: IStory = {
  render: (props) => (
    <SwitchShowcase props={props} cols={cols} verticalAlign="start" />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <SwitchShowcase
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
    <SwitchShowcase
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
