import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { IElementWithLabelProps } from './ElementWithLabelProps';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Switch } from '@/components/atoms/Switch';
import { Radio } from '@/components/atoms/Radio';
import { TextInputField } from '@/components/atoms/TextInputField';
import { ElementWithLabel } from './ElementWithLabel';

const meta = {
  component: ElementWithLabel,
} satisfies Meta<typeof ElementWithLabel>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 260,
  },
});

const defaultArgs = {
  label: 'Label',
  sx: styles.host,
} satisfies Partial<IElementWithLabelProps>;

const cols: Array<IComponentPresentation<IElementWithLabelProps>> = [
  { legend: 'Start', props: { labelPosition: 'start' } },
  { legend: 'End', props: { labelPosition: 'end' } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IElementWithLabelProps>> = [
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
      component={ElementWithLabel}
      props={props}
      cols={cols}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    children: (props) => <TextInputField {...props} />,
    action: 'Action',
  },
};

export const WithCheckbox: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ElementWithLabel}
      props={props}
      cols={cols}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
    children: (props) => <Checkbox {...props} />,
  },
};

export const WithRadio: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ElementWithLabel}
      props={props}
      cols={cols}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
    children: (props) => <Radio {...props} />,
  },
};

export const WithSwitch: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ElementWithLabel}
      props={props}
      cols={cols}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
    children: (props) => <Switch {...props} />,
  },
};

export default meta;
