import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay } from '@olivierpascal/helpers';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Switch, type ISwitchProps, type ISwitchOwnProps } from './Switch';

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
            defaultSelected: true,
          },
        },
        { legend: 'With icons', props: { icons: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledSwitch: React.FC<Omit<ISwitchProps, 'onChange' | 'as'>> = (
  props,
) => {
  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(_, checked) => delay(300).then(() => setChecked(checked))}
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

export const WithoutIcons: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Switch}
      props={props}
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultSelected: true } },
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
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultSelected: true } },
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
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultSelected: true } },
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
      cols={states}
      rows={[
        { legend: 'Unselected' },
        { legend: 'Selected', props: { defaultSelected: true } },
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
