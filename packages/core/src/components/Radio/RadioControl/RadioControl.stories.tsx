import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioControlProps } from './RadioControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { RadioControl } from './RadioControl';

const meta = {
  component: RadioControl,
} satisfies Meta<typeof RadioControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<IRadioControlProps>;

const states: Array<IComponentPresentation<IRadioControlProps>> = [
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

const RadioControlShowcase = componentShowcaseFactory(RadioControl);

export const Basic: IStory = {
  render: (props) => (
    <RadioControlShowcase
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
    <RadioControlShowcase
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
    <RadioControlShowcase
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
    <RadioControlShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked', props: { checked: false } },
        { legend: 'Checked', props: { checked: true } },
      ]}
      groups={[
        {
          legend: 'Normal',
        },
        {
          legend: 'Error',
          props: {
            hasError: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
