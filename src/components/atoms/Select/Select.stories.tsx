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

const rowsProps: IComponentPropsWithLegend<ISelectProps> = [
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
    displayValue='Apple'
  />,
  <Select.Divider key={1} />,
  <Select.Option
    key={2}
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
    displayValue='Lemon'
  />,
  <Select.Option
    key={3}
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
    displayValue='Carrot'
  />,
  <Select.Option
    key={4}
    value='hotPepper'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    supportingText='Yummy!'
    displayValue='Pepper Hot'
  />,
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Select}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Select}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
    variant: 'outlined',
  },
};

export default meta;
