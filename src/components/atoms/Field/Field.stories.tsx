import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Field, type IFieldProps } from './Field';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: Field,
} satisfies Meta<typeof Field>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: '200px',
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IFieldProps>;

const statesProps: IComponentPropsWithLegend<IFieldProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IFieldProps> = [
  { $legend: 'Empty' },
  { $legend: 'Placeholder', placeholder: 'Placeholder' },
  {
    $legend: 'Value',
    value: 'Value',
  },
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Field}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Field}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
