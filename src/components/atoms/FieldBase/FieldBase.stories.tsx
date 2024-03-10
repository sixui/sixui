import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import type { IStyles } from '@/helpers/types';
import {
  type IFieldBaseStyleKey,
  fieldBaseVariants,
} from './FieldBase.styledefs';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { FieldBase, type IFieldBaseProps } from './FieldBase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: FieldBase,
} satisfies Meta<typeof FieldBase>;

type IStory = StoryObj<typeof meta>;

const fieldStyles = stylex.create<IStyles<IFieldBaseStyleKey>>({
  host: {
    width: 200,
  },
});

const inputStyles = stylex.create({
  host: {
    width: '100%',
    height: 24,
  },
  host$populated: {
    backgroundColor: colorRolesVars.surfacePlaceholder,
  },
});

const defaultArgs = {
  styles: fieldStyles,
  children: (
    <div {...stylex.props(inputStyles.host, inputStyles.host$populated)} />
  ),
} satisfies Partial<IFieldBaseProps>;

const statesProps: IComponentPropsWithLegend<IFieldBaseProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IFieldBaseProps> = [
  { $legend: 'Basic' },
  { $legend: 'Required', required: true },
  { $legend: 'Error', hasError: true },
];

const groupsProps: IComponentPropsWithLegend<IFieldBaseProps> =
  fieldBaseVariants.map((variant) => ({
    $legend: capitalizeFirstLetter(variant),
    variant,
  }));

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
      props={props}
      colsProps={fieldBaseVariants.map((variant) => ({
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

export const Empty: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const WithData: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
      groupsProps={groupsProps}
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
    leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    trailingIcon: <FontAwesomeIcon icon={faXmark} />,
  },
};

export default meta;
