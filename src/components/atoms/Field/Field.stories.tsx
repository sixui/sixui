import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IStyles } from '@/helpers/types';
import { type IFieldStyleKey, fieldVariants } from './Field.styledefs';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Field, type IFieldProps } from './Field';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: Field,
} satisfies Meta<typeof Field>;

type IStory = StoryObj<typeof meta>;

const fieldStyles = stylex.create<IStyles<IFieldStyleKey>>({
  host: {
    width: '200px',
  },
});

const inputStyles = stylex.create({
  host: {
    width: '100%',
    height: '24px',
  },
  host$populated: {
    backgroundColor: colorRolesVars.secondary,
  },
});

const defaultArgs = {
  styles: fieldStyles,
  children: <div {...stylex.props(inputStyles.host)} />,
} satisfies Partial<IFieldProps>;

const statesProps: IComponentPropsWithLegend<IFieldProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Resizable', resizable: true },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IFieldProps> = [
  { $legend: 'Basic' },
  { $legend: 'Required', required: true },
  {
    $legend: 'Populated',
    populated: true,
    children: (
      <div {...stylex.props(inputStyles.host, inputStyles.host$populated)} />
    ),
  },
  { $legend: 'Error', error: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Field}
      props={props}
      colsProps={fieldVariants.map((variant) => ({
        variant,
        label: capitalizeFirstLetter(variant),
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    supportingText: 'Supporting text',
    errorText: 'Error text',
  },
};

export const FilledEmpty: IStory = {
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

export const FilledWithText: IStory = {
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
    label: 'Label',
    supportingText: 'Supporting text',
    errorText: 'Error text',
    count: 2,
    max: 10,
  },
};

export const FilledWithStartAndEnd: IStory = {
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
    start: 'start',
    end: 'end',
  },
};

export const OutlinedEmpty: IStory = {
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

export const OutlinedWithText: IStory = {
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
    label: 'Label',
    supportingText: 'Supporting text',
    errorText: 'Error text',
    count: 2,
    max: 10,
  },
};

export const OutlinedWithStartAndEnd: IStory = {
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
    start: 'start',
    end: 'end',
  },
};

export default meta;
