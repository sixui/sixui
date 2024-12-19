import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delay } from '@olivierpascal/helpers';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { ISwitchProps } from './Switch.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Switch } from './Switch';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
} satisfies Partial<ISwitchProps>;

const states: Array<IComponentPresentation<ISwitchProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const SwitchShowcase = componentShowcaseFactory(Switch);

export const Uncontrolled: IStory = {
  render: (props) => (
    <SwitchShowcase
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With checked icon',
          props: {
            showOnlyCheckedIcon: true,
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

const ControlledSwitchShowcase = componentShowcaseFactory(ControlledSwitch);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledSwitchShowcase
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With checked icon',
          props: {
            showOnlyCheckedIcon: true,
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
    <SwitchShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Selected', props: { defaultChecked: true } },
      ]}
      groups={[
        {
          legend: 'Basic',
        },
        {
          legend: 'With checked icon',
          props: { showOnlyCheckedIcon: true },
        },
        {
          legend: 'With icons',
          props: { icons: true },
        },
        {
          legend: 'With custom icons',
          props: {
            icon: <FontAwesomeIcon icon={faMinus} />,
            checkedIcon: <FontAwesomeIcon icon={faPlus} />,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
