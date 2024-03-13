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
import { Select, type ISelectProps } from './Select';
import { useState } from 'react';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ISelectProps>;

const statesProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsUncontrolledProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    defaultValue: 'carrot',
  },
];

const rowsControlledProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    value: 'carrot',
  },
];

const options = [
  <Select.Option
    key={0}
    value='apple'
    disabled
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </Select.Option>,
  <Select.Divider key={1} />,
  <Select.Option
    key={2}
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
  >
    Lemon
  </Select.Option>,
  <Select.Option
    key={3}
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
  >
    Carrot
  </Select.Option>,
  <Select.Option
    key={4}
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    supportingText='Yummy!'
  >
    Pepper Hot
  </Select.Option>,
];

const ControlledSelect: React.FC<Omit<ISelectProps, 'onChange'>> = (props) => {
  const [value, setValue] = useState(props.value ?? '');

  const handleChange = (value: string): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <Select {...props} value={value} onChange={handleChange} />;
};

export const FilledUncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Select}
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
      component={Select}
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
