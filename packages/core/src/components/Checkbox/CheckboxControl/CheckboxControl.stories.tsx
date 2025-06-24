import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IOmit } from '~/utils/types';
import type { ICheckboxControlProps } from './CheckboxControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { CheckboxControl } from './CheckboxControl';

const meta = {
  component: CheckboxControl,
} satisfies Meta<typeof CheckboxControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
  value: 'toggled',
} satisfies Partial<ICheckboxControlProps>;

const states: Array<IComponentPresentation<ICheckboxControlProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const changeActions: Array<IComponentPresentation<ICheckboxControlProps>> = [
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

const CheckboxControlShowcase = componentShowcaseFactory(CheckboxControl);

export const Uncontrolled: IStory = {
  render: (props) => (
    <CheckboxControlShowcase
      props={props}
      cols={[
        {},
        { props: { defaultIndeterminate: true } },
        { props: { defaultChecked: true } },
      ]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

const ControlledCheckboxControl: React.FC<
  IOmit<ICheckboxControlProps, 'checked'>
> = (props) => {
  const { onChange, defaultChecked, defaultIndeterminate, ...other } = props;
  const [checked, setChecked] = useState(defaultChecked ?? false);
  const [indeterminate, setIndeterminate] = useState(
    defaultIndeterminate ?? false,
  );

  const handleChange: ICheckboxControlProps['onChange'] = onChange
    ? (checked) =>
        Promise.resolve()
          .then(() => onChange(checked))
          .then(() => {
            setIndeterminate(false);
            setChecked(checked);
          })
    : undefined;

  return (
    <CheckboxControl
      {...other}
      checked={checked}
      onChange={handleChange}
      indeterminate={indeterminate}
    />
  );
};

const ControlledCheckboxControlShowcase = componentShowcaseFactory(
  ControlledCheckboxControl,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledCheckboxControlShowcase
      props={props}
      cols={[
        {},
        { props: { defaultIndeterminate: true } },
        { props: { defaultChecked: true } },
      ]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <CheckboxControlShowcase
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
    <CheckboxControlShowcase
      props={props}
      cols={[
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Configurations: IStory = {
  render: (props) => (
    <CheckboxControlShowcase
      props={props}
      cols={states}
      rows={[
        {
          legend: 'Unchecked',
        },
        {
          legend: 'Indeterminate',
          props: {
            defaultIndeterminate: true,
          },
        },
        {
          legend: 'Checked',
          props: {
            defaultChecked: true,
          },
        },
      ]}
      groups={[
        {
          legend: 'Normal',
        },
        {
          legend: 'Error',
          props: {
            hasError: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
