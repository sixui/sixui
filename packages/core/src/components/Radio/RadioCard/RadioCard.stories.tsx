import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioCardProps } from './RadioCard.types';
import { Card } from '~/components/Card';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { RadioCard } from './RadioCard';

const meta = {
  component: RadioCard,
} satisfies Meta<typeof RadioCard>;

type IStory = StoryObj<typeof meta>;

const MEDIA_URL =
  'https://images.unsplash.com/photo-1729366791089-6c9643dee806?q=80&w=600';

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
  label: 'Label',
  supportingText: 'This text explains more about the option shown in the card.',
  w: '224px',
} satisfies Partial<IRadioCardProps>;

const states: Array<IComponentPresentation<IRadioCardProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const changeActions: Array<IComponentPresentation<IRadioCardProps>> = [
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

const RadioCardShowcase = componentShowcaseFactory(RadioCard);

const ControlledRadioCardDemo: React.FC<IRadioCardProps> = (props) => {
  const { onChange, ...other } = props;
  const [value, setValue] = useState<string>('');
  const name = useId();

  const handleChange: IRadioCardProps['onChange'] = onChange
    ? (checked) =>
        Promise.resolve()
          .then(() => onChange(checked))
          .then(() => {
            setValue(value);
          })
    : undefined;

  return (
    <Flex direction="row" gap="$xl">
      <RadioCard
        {...other}
        onChange={handleChange}
        value="apple"
        label="Apple"
        checked={value === 'apple'}
        name={name}
      />
      <RadioCard
        {...other}
        onChange={handleChange}
        value="lemon"
        label="Lemon"
        checked={value === 'lemon'}
        name={name}
      />
      <RadioCard
        {...other}
        onChange={handleChange}
        value="carrot"
        label="Carrot"
        checked={value === 'carrot'}
        name={name}
      />
    </Flex>
  );
};

const ControlledRadioCardDemoShowcase = componentShowcaseFactory(
  ControlledRadioCardDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledRadioCardDemoShowcase props={props} rows={changeActions} />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <RadioCardShowcase
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
    <RadioCardShowcase
      props={props}
      cols={[
        { legend: '-3', props: { density: -3 } },
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
    <RadioCardShowcase
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

export const Custom: IStory = {
  render: (props) => (
    <RadioCardShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
    children: <Card.Media src={MEDIA_URL} h="128px" />,
  },
};

export default meta;
