import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ILabeledProps } from './Labeled.types';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Radio } from '~/components/Radio';
import { Switch } from '~/components/Switch';
import { TextInputField } from '~/components/TextInputField';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Labeled } from './Labeled';

const meta = {
  component: Labeled,
} satisfies Meta<typeof Labeled>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  label: 'Label',
} satisfies Partial<ILabeledProps>;

const colsHorizontal: Array<IComponentPresentation<ILabeledProps>> = [
  { legend: 'Left', props: { labelPosition: 'left' } },
  { legend: 'Right', props: { labelPosition: 'right' } },
];

const colsVertical: Array<IComponentPresentation<ILabeledProps>> = [
  { legend: 'Top', props: { labelPosition: 'top' } },
  { legend: 'Bottom', props: { labelPosition: 'bottom' } },
];

const rows: Array<IComponentPresentation<ILabeledProps>> = [
  { legend: 'With label' },
  {
    legend: 'With supporting text',
    props: { supportingText: 'Supporting text' },
  },
  {
    legend: 'With error',
    props: { hasError: true },
  },
  {
    legend: 'With error and error text',
    props: { hasError: true, errorText: 'Error' },
  },
  {
    legend: 'With error, error text and supporting text',
    props: {
      hasError: true,
      errorText: 'Error',
      supportingText: 'Supporting text',
    },
  },
  {
    legend: 'Disabled',
    props: { disabled: true },
  },
];
const LabeledShowcase = componentShowcaseFactory(Labeled);

export const WithTextField: IStory = {
  render: (props) => (
    <LabeledShowcase
      props={props}
      cols={colsVertical}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    w: '$64',
    children: (
      <TextInputField
        onChange={(...args) => sbHandleEvent('onClick', args, 1000)}
      />
    ),
    trailingAction: 'Action',
  },
};

export const WithCheckbox: IStory = {
  render: (props) => (
    <LabeledShowcase
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    w: '$28',
    children: (
      <Checkbox.Control
        onChange={(...args) => sbHandleEvent('onClick', args, 1000)}
      />
    ),
  },
};

export const WithRadio: IStory = {
  render: (props) => (
    <LabeledShowcase
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    w: '$28',
    children: (
      <Radio.Control
        onChange={(...args) => sbHandleEvent('onClick', args, 1000)}
      />
    ),
  },
};

export const WithSwitch: IStory = {
  render: (props) => (
    <LabeledShowcase
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    w: '$28',
    children: (
      <Switch.Control
        onChange={(...args) => sbHandleEvent('onClick', args, 1000)}
      />
    ),
  },
};

export default meta;
