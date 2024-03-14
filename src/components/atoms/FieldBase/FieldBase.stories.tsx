import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { fieldBaseVariants } from './FieldBase.styledefs';
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

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const inputStyles = stylex.create({
  placeholder: {
    width: '100%',
    height: 24,
    backgroundColor: colorRolesVars.surfacePlaceholder,
  },
});

const defaultArgs = {
  sx: styles.host,
  children: <div {...stylex.props(inputStyles.placeholder)} />,
} satisfies Partial<IFieldBaseProps>;

const statesProps: IComponentPropsWithLegend<IFieldBaseProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IFieldBaseProps> = [
  { $legend: 'Empty' },
  {
    $legend: 'Label',
    label: 'Label',
  },
  {
    $legend: 'Populated',
    label: 'Label',
    populated: true,
  },
  {
    $legend: 'Slots',
    label: 'Label',
    supportingText: 'Supporting text',
    count: 2,
    max: 10,
    leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    trailingIcon: <FontAwesomeIcon icon={faXmark} />,
  },
  { $legend: 'Loading', loading: true },
  { $legend: 'Error', hasError: true, errorText: 'Error text' },
  { $legend: 'Resizable', resizable: true },
];

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
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FieldBase}
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
      component={FieldBase}
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
