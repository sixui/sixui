import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ITextInputProps } from './TextInput.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { TextInput } from './TextInput';

const meta = {
  component: TextInput,
} satisfies Meta<typeof TextInput>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  label: 'Label',
  supportingText: 'Supporting text',
  w: '256px',
} satisfies Partial<ITextInputProps>;

const cols: Array<IComponentPresentation<ITextInputProps>> = [
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

const rows: Array<IComponentPresentation<ITextInputProps>> = [
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

const TextInputShowcase = componentShowcaseFactory(TextInput);

export const Basic: IStory = {
  render: (props) => (
    <TextInputShowcase
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
    <TextInputShowcase
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
    <TextInputShowcase
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
