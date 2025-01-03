import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IRadioProps } from './Radio.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Radio } from './Radio';

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<IRadioProps>;

const states: Array<IComponentPresentation<IRadioProps>> = [
  { legend: 'Normal' },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const RadioShowcase = componentShowcaseFactory(Radio);

export const Basic: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={[{ props: { checked: false } }, { props: { checked: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Scales: IStory = {
  render: (props) => (
    <RadioShowcase
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
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Densities: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={[
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked', props: { checked: false } },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
