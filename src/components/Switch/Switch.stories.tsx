import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delay } from '@olivierpascal/helpers';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { ISwitchProps } from './Switch.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ComponentShowcase } from '../ComponentShowcase';
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
} satisfies Partial<ISwitchProps>;

const states: Array<IComponentPresentation<ISwitchProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
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
            defaultChecked: true,
          },
        },
        { legend: 'With icons', props: { icons: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledSwitch: React.FC<IOmit<ISwitchProps, 'checked'>> = (props) => {
  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(event, value) => {
        const checked = value !== undefined;

        return delay(300).then(() => {
          setChecked(checked);
          props.onChange?.(event, value);
        });
      }}
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
            defaultChecked: true,
          },
        },
        { legend: 'With icons', props: { icons: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultChecked: true } },
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
