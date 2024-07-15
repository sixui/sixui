import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IOptionCardOwnProps } from './OptionCard.types';
import { Switch } from '@/components/atoms/Switch';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Checkbox } from '@/components/atoms/Checkbox';
import { OptionCard } from './OptionCard';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { RadioGroup } from '@/components/atoms/RadioGroup';
import { Radio } from '@/components/atoms/Radio';

const meta = {
  component: OptionCard,
} satisfies Meta<typeof OptionCard>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    width: 300,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.5rem',
  },
});

const defaultArgs = {
  sx: styles.card,
} satisfies Partial<IOptionCardOwnProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={OptionCard}
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
      ]}
      cols={[
        {
          legend: 'No control',
        },
        {
          legend: 'Switch control',
          props: {
            as: Switch,
          },
        },
        {
          legend: 'Checkbox control',
          props: {
            as: Checkbox,
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

const OptionCardRadioGroup: React.FC<IOptionCardOwnProps> = (props) => {
  return (
    <RadioGroup
      sx={styles.radioGroup}
      onChange={(...args) => void sbHandleEvent('change', args)}
    >
      <OptionCard {...props} as={Radio} value='1' />
      <OptionCard {...props} as={Radio} value='2' />
      <OptionCard {...props} as={Radio} value='3' />
    </RadioGroup>
  );
};

export const WithRadioGroup: IStory = {
  render: (props) => (
    <ComponentShowcase component={OptionCardRadioGroup} props={props} />
  ),
  args: {
    ...defaultArgs,
    label: 'Label',
    supportingText: 'Clicking on this card to toggle it.',
    children: 'This text explains more about the option shown in the card.',
  },
};

export default meta;
