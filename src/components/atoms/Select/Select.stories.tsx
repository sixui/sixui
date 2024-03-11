import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  ComponentShowcase,
  type IComponentPropsWithLegend,
} from '@/components/utils/ComponentShowcase';
import { Select, type ISelectProps } from './Select';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';

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
  disabled: true,
} satisfies Partial<ISelectProps>;

const statesProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
];

const rowsProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Basic' },
  { $legend: 'With Label', label: 'Label' },
  { $legend: 'With Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'With Default Value',
    value: 'banana',
  },
];

const options = [
  <Select.Option key={0} value='apple' disabled>
    Apple
  </Select.Option>,
  <MenuListDivider key={1} />,
  <Select.Option key={2} value='banana'>
    Banana
  </Select.Option>,
  <Select.Option key={3} value='cumcumber'>
    Cumcumber
  </Select.Option>,
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
    value: '',
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
    value: '',
    variant: 'outlined',
  },
};

export default meta;
