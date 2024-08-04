import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { ILabeledOwnProps } from './Labeled.types';
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
} satisfies Partial<ILabeledOwnProps>;

const colsHorizontal: Array<IComponentPresentation<ILabeledOwnProps>> = [
  { legend: 'Left', props: { labelPosition: 'left' } },
  { legend: 'Right', props: { labelPosition: 'right' } },
];

const colsVertical: Array<IComponentPresentation<ILabeledOwnProps>> = [
  { legend: 'Top', props: { labelPosition: 'top' } },
  { legend: 'Bottom', props: { labelPosition: 'bottom' } },
];

const rows: Array<IComponentPresentation<ILabeledOwnProps>> = [
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
    orientation: 'vertical',
    component: TextInputField,
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
    orientation: 'horizontal',
    component: Checkbox,
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
    orientation: 'horizontal',
    component: Radio,
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
    orientation: 'horizontal',
    component: Switch,
  },
};

export default meta;
