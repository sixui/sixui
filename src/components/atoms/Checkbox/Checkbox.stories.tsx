import type { Meta, StoryObj } from '@storybook/react';
import * as stylex from '@stylexjs/stylex';
import React from 'react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { Checkbox, type ICheckboxProps } from './Checkbox';

// https://m3.material.io/components/checkbox/overview
// https://material-web.dev/components/checkbox/
// https://github.com/material-components/material-web/blob/main/checkbox/demo/stories.ts

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (props) => sbHandleEvent('change', props, 0),
} satisfies Partial<ICheckboxProps>;

const statesProps: IComponentPropsWithLegend<ICheckboxProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Checkbox}
      props={props}
      colsProps={[{}, { defaultChecked: true }, { indeterminate: true }]}
    />
  ),
  args: defaultArgs,
};

const ControlledCheckbox: React.FC<Omit<ICheckboxProps, 'onChange'>> = (
  props,
) => {
  const [checked, setChecked] = React.useState(props.defaultChecked ?? false);
  const [indeterminate, setIndeterminate] = React.useState(
    props.indeterminate ?? false,
  );

  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={(event, checked) => {
        setIndeterminate(false);
        setChecked(!checked);
      }}
      indeterminate={indeterminate}
    />
  );
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledCheckbox}
      props={props}
      colsProps={[{}, { defaultChecked: true }, { indeterminate: true }]}
    />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Checkbox}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unchecked' },
        { $legend: 'Checked', defaultChecked: true },
        { $legend: 'Indeterminate', indeterminate: true },
      ]}
    />
  ),
  args: defaultArgs,
};

import { componentVars as checkboxVars } from '@/themes/base/Checkbox/Checkbox.stylex';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const customTheme = stylex.createTheme(checkboxVars, {
  containerShape: '0',
  containerSize: '12px',
  iconSize: '12px',
  stateLayerSize: '20px',
  stateLayerShape: '0',
  selectedContainerColor: colorRolesVars.error,
  selectedIconColor: colorRolesVars.onError,
});

const customFocusRingStyles = stylex.create({
  host: {
    width: '22px',
    height: '22px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: '0',
  },
});

export const Custom: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Checkbox}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unchecked' },
        { $legend: 'Checked', defaultChecked: true },
        { $legend: 'Indeterminate', indeterminate: true },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    theme: customTheme,
    focusRingStyles: customFocusRingStyles,
  },
};

export default meta;
