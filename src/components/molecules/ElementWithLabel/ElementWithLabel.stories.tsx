import type { Meta, StoryObj } from '@storybook/react';

import {
  ElementWithLabel,
  type IElementWithLabelProps,
  type IElementWithLabelOwnProps,
} from './ElementWithLabel';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Switch } from '@/components/atoms/Switch';
import { Radio } from '@/components/atoms/Radio';

const meta = {
  component: ElementWithLabel,
} satisfies Meta<typeof ElementWithLabel>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  label: 'Label',
} satisfies Partial<IElementWithLabelProps>;

const cols: Array<IComponentPresentation<IElementWithLabelOwnProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IElementWithLabelOwnProps>> = [
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
];

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
    as: Checkbox,
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
    as: Radio,
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
    as: Switch,
  },
};

export default meta;
