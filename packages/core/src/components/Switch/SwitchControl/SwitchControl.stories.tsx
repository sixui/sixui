import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faMinus,
  faMoon,
  faPlus,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IOmit } from '~/utils/types';
import type { ISwitchControlProps } from './SwitchControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SwitchControl } from './SwitchControl';

const meta = {
  component: SwitchControl,
} satisfies Meta<typeof SwitchControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
} satisfies Partial<ISwitchControlProps>;

const states: Array<IComponentPresentation<ISwitchControlProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const changeActions: Array<IComponentPresentation<ISwitchControlProps>> = [
  {
    legend: 'Immediate',
    props: {
      onChange: (...args) => sbHandleEvent('onChange', args),
    },
  },
  {
    legend: 'Delayed',
    props: {
      onChange: (...args) => sbHandleEvent('onChange', args, 1000),
    },
  },
];

const SwitchControlShowcase = componentShowcaseFactory(SwitchControl);

export const Uncontrolled: IStory = {
  render: (props) => (
    <SwitchControlShowcase
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With checked icon',
          props: {
            checkedIcon: true,
            defaultChecked: true,
          },
        },
        {
          legend: 'With icons',
          props: {
            checkedIcon: true,
            uncheckedIcon: true,
          },
        },
      ]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

const ControlledSwitchControl: React.FC<
  IOmit<ISwitchControlProps, 'checked'>
> = (props) => {
  const { onChange, ...other } = props;
  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  const handleChange: ISwitchControlProps['onChange'] = onChange
    ? (value) => {
        const checked = value !== undefined;

        return Promise.resolve()
          .then(() => onChange(value))
          .then(() => {
            setChecked(checked);
          });
      }
    : undefined;

  return <SwitchControl {...other} checked={checked} onChange={handleChange} />;
};

const ControlledSwitchControlShowcase = componentShowcaseFactory(
  ControlledSwitchControl,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledSwitchControlShowcase
      props={props}
      cols={[
        { legend: 'Basic' },
        {
          legend: 'With checked icon',
          props: {
            checkedIcon: true,
            defaultChecked: true,
          },
        },
        {
          legend: 'With icons',
          props: {
            checkedIcon: true,
            uncheckedIcon: true,
          },
        },
      ]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <SwitchControlShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <SwitchControlShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Configurations: IStory = {
  render: (props) => (
    <SwitchControlShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { defaultChecked: true } },
      ]}
      groups={[
        {
          legend: 'Basic',
        },
        {
          legend: 'With checked icon',
          props: { checkedIcon: true },
        },
        {
          legend: 'With icons',
          props: {
            checkedIcon: true,
            uncheckedIcon: true,
          },
        },
        {
          legend: 'With custom icons',
          props: {
            uncheckedIcon: <FontAwesomeIcon icon={faMinus} />,
            checkedIcon: <FontAwesomeIcon icon={faPlus} />,
          },
        },
        {
          legend: 'Always on',
          props: {
            uncheckedIcon: <FontAwesomeIcon icon={faMoon} />,
            checkedIcon: <FontAwesomeIcon icon={faSun} />,
            alwaysOn: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
