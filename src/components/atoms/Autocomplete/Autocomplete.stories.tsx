import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPropsWithLegend,
} from '@/components/utils/ComponentShowcase';
import { Autocomplete, type IAutocompleteProps } from './Autocomplete';

const meta = {
  component: Autocomplete,
} satisfies Meta<typeof Autocomplete>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IAutocompleteProps>;

const statesProps: IComponentPropsWithLegend<IAutocompleteProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IAutocompleteProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    value: 'banana',
  },
];

const options = [
  <Autocomplete.Option key={0} value='apple' disabled>
    Apple
  </Autocomplete.Option>,
  <Autocomplete.Divider key={1} />,
  <Autocomplete.Option key={2} value='banana'>
    Banana
  </Autocomplete.Option>,
  <Autocomplete.Option key={3} value='cumcumber'>
    Cumcumber
  </Autocomplete.Option>,
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Autocomplete}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: '',
    children: options,
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Autocomplete}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    value: '',
    variant: 'outlined',
  },
};

export default meta;
