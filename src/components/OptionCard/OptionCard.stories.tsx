import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IOptionCardProps } from './OptionCard.types';
import { Switch } from '../Switch';
import { ComponentShowcase } from '../ComponentShowcase';
import { Checkbox } from '../Checkbox';
import { OptionCard } from './OptionCard';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { RadioGroup } from '../RadioGroup';
import { Radio } from '../Radio';

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
} satisfies Partial<IOptionCardProps>;

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
            component: Switch,
          },
        },
        {
          legend: 'Checkbox control',
          props: {
            component: Checkbox,
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
    <RadioGroup
      sx={styles.radioGroup}
      onChange={(...args) => void sbHandleEvent('change', args)}
    >
      <OptionCard {...props} component={Radio} value='1' />
      <OptionCard {...props} component={Radio} value='2' />
      <OptionCard {...props} component={Radio} value='3' />
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
