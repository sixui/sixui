import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { ILabeledProps } from './Labeled.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { Radio } from '../Radio';
import { TextInputField } from '../TextInputField';
import { Labeled } from './Labeled';

const meta = {
  component: Labeled,
} satisfies Meta<typeof Labeled>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 120,
  },
  host$lg: {
    width: 240,
  },
});

const defaultArgs = {
  label: 'Label',
  sx: styles.host,
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
];

export const WithTextField: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Labeled}
      props={props}
      cols={colsVertical}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: <TextInputField />,
    trailingAction: 'Action',
    sx: styles.host$lg,
  },
};

export const WithCheckbox: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Labeled}
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: <Checkbox />,
  },
};

export const WithRadio: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Labeled}
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: <Radio />,
  },
};

export const WithSwitch: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Labeled}
      props={props}
      cols={colsHorizontal}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: <Switch />,
  },
};

export default meta;
