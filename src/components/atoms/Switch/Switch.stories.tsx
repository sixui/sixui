import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@olivierpascal/helpers';

import type { ISwitchOwnProps } from './SwitchProps';
import type { IOmit } from '@/helpers/types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Switch } from './Switch';

// https://m3.material.io/components/switch/overview
// https://material-web.dev/components/switch/
// https://github.com/material-components/material-web/blob/main/switch/demo/stories.ts

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args, 300),
} satisfies Partial<ISwitchOwnProps>;

const states: Array<IComponentPresentation<ISwitchOwnProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With selected icon',
          props: {
            showOnlySelectedIcon: true,
            defaultValue: true,
          },
        },
        { legend: 'With icons', props: { icons: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledSwitch: React.FC<
  IOmit<ISwitchOwnProps, 'checked' | 'value'>
> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? false);

  return (
    <Switch
      {...props}
      value={value}
      onChange={(event, value) =>
        delay(300).then(() => {
          setValue(value);
          props.onChange?.(event, value);
        })
      }
    />
  );
};

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ControlledSwitch}
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With selected icon',
          props: {
            showOnlySelectedIcon: true,
            defaultValue: true,
          },
        },
        { legend: 'With icons', props: { icons: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultValue: true } },
      ]}
      groups={[
        {
          legend: 'Basic',
        },
        {
          legend: 'With selected icons',
          props: { showOnlySelectedIcon: true },
        },
        {
          legend: 'With icons',
          props: { icons: true },
        },
        {
          legend: 'With custom icons',
          props: {
            icon: <FontAwesomeIcon icon={faMinus} />,
            selectedIcon: <FontAwesomeIcon icon={faPlus} />,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
