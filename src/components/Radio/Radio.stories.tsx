import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useId, useState } from 'react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IRadioProps } from './Radio.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { Radio } from './Radio';

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioProps>;

const states: Array<IComponentPresentation<IRadioProps>> = [
  { legend: 'Enabled' },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const RadioShowcase = componentShowcaseFactory(Radio);

export const Basic: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={[
        { legend: 'Unchecked', props: { checked: false } },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <RadioShowcase
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
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Densities: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <RadioShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked', props: { checked: false } },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

const ControlledRadioDemo: React.FC<IRadioProps> = (props) => {
  const [value, setValue] =
    useState<React.InputHTMLAttributes<HTMLInputElement>['value']>('');
  const name = useId();
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (
      ...args: [
        event: React.ChangeEvent<HTMLInputElement>,
        value: React.InputHTMLAttributes<HTMLInputElement>['value'],
      ]
    ): Promise<void> => {
      setLoading(true);

      return sbHandleEvent('onChange', args, 1000)
        .then(() => setValue(args[1]))
        .finally(() => setLoading(false));
    },
    [],
  );

  return (
    <Flex direction="row" gap="$8">
      <Radio
        {...props}
        onChange={handleChange}
        value="apple"
        checked={value === 'apple'}
        name={name}
        readOnly={loading}
      />
      <Radio
        {...props}
        onChange={handleChange}
        value="banana"
        checked={value === 'banana'}
        name={name}
        readOnly={loading}
      />
    </Flex>
  );
};

const ControlledRadioDemoShowcase =
  componentShowcaseFactory(ControlledRadioDemo);

export const Controlled: IStory = {
  render: (props) => <ControlledRadioDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
