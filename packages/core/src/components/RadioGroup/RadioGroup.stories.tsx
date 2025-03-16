import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioGroupProps } from './RadioGroup.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { RadioGroup } from './RadioGroup';
import { RadioGroupDemo } from './RadioGroup.stories/RadioGroupDemo';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  label: 'Label',
  supportingText: 'Supporting text',
  defaultValue: 'a',
} satisfies Partial<IRadioGroupProps>;

const rows: Array<IComponentPresentation<IRadioGroupProps>> = [
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

const RadioGroupDemoShowcase = componentShowcaseFactory(RadioGroupDemo);

export const Basic: IStory = {
  render: (props) => (
    <RadioGroupDemoShowcase props={props} rows={rows} verticalAlign="start" />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <RadioGroupDemoShowcase
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
    <RadioGroupDemoShowcase
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
