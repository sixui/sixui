import type { Meta, StoryObj } from '@storybook/react';

import type { IOptionCardProps } from './OptionCard.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Checkbox } from '../Checkbox';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Switch } from '../Switch';
import { OptionCard } from './OptionCard';

const meta = {
  component: OptionCard,
} satisfies Meta<typeof OptionCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<IOptionCardProps>;

const OptionCardShowcase = componentShowcaseFactory(OptionCard);

export const Basic: IStory = {
  render: (props) => (
    <OptionCardShowcase
      props={props}
      rows={[
        {
          legend: 'Enabled',
        },
        {
          legend: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          legend: 'Read-only',
          props: {
            readOnly: true,
          },
        },
      ]}
      cols={[
        {
          legend: 'No control',
        },
        {
          legend: 'Checked',
          props: {
            checked: true,
          },
        },
        {
          legend: 'Switch control',
          props: {
            control: Switch,
          },
        },
        {
          legend: 'Checkbox control',
          props: {
            control: Checkbox,
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('change', args),
    label: 'Label',
    supportingText: 'Clicking on this card to toggle it.',
    children: 'This text explains more about the option shown in the card.',
  },
};

const OptionCardRadioGroup: React.FC<IOptionCardProps> = (props) => {
  return (
    <RadioGroup onChange={(...args) => void sbHandleEvent('onChange', args)}>
      <Flex direction="row" gap="$6">
        <OptionCard {...props} control={Radio} value="1" />
        <OptionCard {...props} control={Radio} value="2" />
        <OptionCard {...props} control={Radio} value="3" />
      </Flex>
    </RadioGroup>
  );
};

const OptionCardRadioGroupShowcase =
  componentShowcaseFactory(OptionCardRadioGroup);

export const WithRadioGroup: IStory = {
  render: (props) => <OptionCardRadioGroupShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Label',
    supportingText: 'Clicking on this card to toggle it.',
    children: 'This text explains more about the option shown in the card.',
  },
};

export default meta;
