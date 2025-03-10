import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IColorInputProps } from './ColorInput.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { ColorInput } from './ColorInput';

const meta = {
  component: ColorInput,
} satisfies Meta<typeof ColorInput>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  label: 'Label',
  supportingText: 'Supporting text',
  w: '256px',
} satisfies Partial<IColorInputProps>;

const cols: Array<IComponentPresentation<IColorInputProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
      errorText: 'Error text',
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

const rows: Array<IComponentPresentation<IColorInputProps>> = [
  {
    legend: 'Filled',
    props: {
      variant: 'filled',
    },
  },
  {
    legend: 'Outlined',
    props: {
      variant: 'outlined',
    },
  },
];

const ColorInputShowcase = componentShowcaseFactory(ColorInput);

export const Basic: IStory = {
  render: (props) => (
    <ColorInputShowcase
      props={props}
      cols={cols}
      rows={rows}
      verticalAlign="start"
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <ColorInputShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <ColorInputShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export default meta;
