import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPropsWithLegend,
} from '@/components/utils/ComponentShowcase';
import { SelectMultiple, type ISelectMultipleProps } from './SelectMultiple';
import { useState } from 'react';

const meta = {
  component: SelectMultiple,
} satisfies Meta<typeof SelectMultiple>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ISelectMultipleProps>;

const statesProps: IComponentPropsWithLegend<ISelectMultipleProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsUncontrolledProps: IComponentPropsWithLegend<ISelectMultipleProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    defaultValue: ['lemon', 'pepperHot'],
  },
];

const rowsControlledProps: IComponentPropsWithLegend<ISelectMultipleProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    value: ['lemon', 'pepperHot'],
  },
];

const options = [
  <SelectMultiple.Option
    key={0}
    value='apple'
    disabled
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </SelectMultiple.Option>,
  <SelectMultiple.Divider key={1} />,
  <SelectMultiple.Option
    key={2}
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
  >
    Lemon
  </SelectMultiple.Option>,
  <SelectMultiple.Option
    key={3}
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
  >
    Carrot
  </SelectMultiple.Option>,
  <SelectMultiple.Option
    key={4}
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    supportingText='Yummy!'
  >
    Pepper Hot
  </SelectMultiple.Option>,
];

const ControlledSelect: React.FC<Omit<ISelectMultipleProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? []);

  const handleChange = (value: Array<string>): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <SelectMultiple {...props} value={value} onChange={handleChange} />;
};

export const FilledUncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsUncontrolledProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const FilledControlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSelect}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsControlledProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const OutlinedUncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SelectMultiple}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsUncontrolledProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export const OutlinedControlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSelect}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsControlledProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export default meta;
