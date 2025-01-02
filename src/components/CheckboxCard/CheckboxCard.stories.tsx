import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { ICheckboxCardProps } from './CheckboxCard.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { CheckboxCard } from './CheckboxCard';

const meta = {
  component: CheckboxCard,
} satisfies Meta<typeof CheckboxCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
  label: 'Label',
  supportingText: 'Clicking on this card to toggle it.',
  children: 'This text explains more about the option shown in the card.',
  w: '$56',
} satisfies Partial<ICheckboxCardProps>;

const states: Array<IComponentPresentation<ICheckboxCardProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const changeActions: Array<IComponentPresentation<ICheckboxCardProps>> = [
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

const CheckboxCardShowcase = componentShowcaseFactory(CheckboxCard);

export const Uncontrolled: IStory = {
  render: (props) => (
    <CheckboxCardShowcase
      props={props}
      cols={[{}, { props: { defaultChecked: true } }]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

const ControlledCheckboxCard: React.FC<IOmit<ICheckboxCardProps, 'checked'>> = (
  props,
) => {
  const { onChange, defaultChecked, ...other } = props;
  const [checked, setChecked] = useState(defaultChecked ?? false);

  const handleChange: ICheckboxCardProps['onChange'] = onChange
    ? (event, value) => {
        const checked = value !== undefined;

        return Promise.resolve(onChange?.(event, value)).then(() =>
          setChecked(checked),
        );
      }
    : undefined;

  return <CheckboxCard {...other} checked={checked} onChange={handleChange} />;
};

const ControlledCheckboxCardShowcase = componentShowcaseFactory(
  ControlledCheckboxCard,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledCheckboxCardShowcase
      props={props}
      cols={[{}, { props: { defaultChecked: true } }]}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <CheckboxCardShowcase
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
    <CheckboxCardShowcase
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
    <CheckboxCardShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { defaultChecked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
