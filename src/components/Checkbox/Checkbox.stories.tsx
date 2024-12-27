import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICheckboxProps } from './Checkbox.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<ICheckboxProps>;

const states: Array<IComponentPresentation<ICheckboxProps>> = [
  { legend: 'Static', props: { onChange: undefined } },
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const changeActions: Array<IComponentPresentation<ICheckboxProps>> = [
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

const CheckboxShowcase = componentShowcaseFactory(Checkbox);

export const Uncontrolled: IStory = {
  render: (props) => (
    <CheckboxShowcase
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

const ControlledCheckbox: React.FC<IOmit<ICheckboxProps, 'checked'>> = (
  props,
) => {
  const { onChange, ...other } = props;
  const [checked, setChecked] = useState(props.defaultChecked ?? false);
  const [indeterminate, setIndeterminate] = useState(
    props.defaultIndeterminate ?? false,
  );

  const handleChange: ICheckboxProps['onChange'] = onChange
    ? (event, value) => {
        const checked = value !== undefined;

        return Promise.resolve(onChange?.(event, value)).then(() => {
          setIndeterminate(false);
          setChecked(checked);
        });
      }
    : undefined;

  return (
    <Checkbox
      {...other}
      checked={checked}
      onChange={handleChange}
      indeterminate={indeterminate}
    />
  );
};

const ControlledCheckboxShowcase = componentShowcaseFactory(ControlledCheckbox);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledCheckboxShowcase
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
    <CheckboxShowcase
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
    <CheckboxShowcase
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
    <CheckboxShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Indeterminate', props: { defaultIndeterminate: true } },
        { legend: 'Checked', props: { defaultChecked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
