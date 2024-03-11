import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@olivierpascal/helpers';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Switch, type ISwitchProps } from './Switch';

// https://m3.material.io/components/switch/overview
// https://material-web.dev/components/switch/
// https://github.com/material-components/material-web/blob/main/switch/demo/stories.ts

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (args) => sbHandleEvent('change', args, 300),
} satisfies Partial<ISwitchProps>;

const statesProps: IComponentPropsWithLegend<ISwitchProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Loading', loading: true },
  { $legend: 'Disabled', disabled: true },
];

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      colsProps={[
        { $legend: 'Basic' },
        {
          $legend: 'With selected icon',
          showOnlySelectedIcon: true,
          defaultSelected: true,
        },
        { $legend: 'With icons', icons: true },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledSwitch: React.FC<Omit<ISwitchProps, 'onChange' | 'as'>> = (
  props,
) => {
  const [selected, setSelected] = useState(props.defaultSelected ?? false);

  return (
    <Switch
      {...props}
      selected={selected}
      onChange={(_, state) => delay(300).then(() => setSelected(state))}
    />
  );
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSwitch}
      props={props}
      colsProps={[
        { $legend: 'Basic' },
        {
          $legend: 'With selected icon',
          showOnlySelectedIcon: true,
          defaultSelected: true,
        },
        { $legend: 'With icons', icons: true },
      ]}
    />
  ),
  args: defaultArgs,
};

export const WithoutIcons: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unselected' },
        { $legend: 'Selected', defaultSelected: true },
      ]}
    />
  ),
  args: defaultArgs,
};

export const WithSelectedIcon: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unselected' },
        { $legend: 'Selected', defaultSelected: true },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    showOnlySelectedIcon: true,
  },
};

export const WithIcons: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unselected' },
        { $legend: 'Selected', defaultSelected: true },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icons: true,
  },
};

export const WithCustomIcons: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Unselected' },
        { $legend: 'Selected', defaultSelected: true },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faMinus} />,
    selectedIcon: <FontAwesomeIcon icon={faPlus} />,
  },
};

export default meta;
