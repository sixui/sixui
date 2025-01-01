import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IOptionCardProps } from './OptionCard.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { Checkbox } from '../Checkbox';
import { ComponentShowcase } from '../ComponentShowcase';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Stack } from '../Stack';
import { Switch } from '../Switch';
import { OptionCard } from './OptionCard';

const meta = {
  component: OptionCard,
} satisfies Meta<typeof OptionCard>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    width: `calc(300px * ${scaleTokens.scale})`,
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
    <RadioGroup onChange={(...args) => void sbHandleEvent('change', args)}>
      <Stack horizontal gap={6}>
        <OptionCard {...props} as={Radio} value="1" />
        <OptionCard {...props} as={Radio} value="2" />
        <OptionCard {...props} as={Radio} value="3" />
      </Stack>
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
