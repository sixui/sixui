import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import type { IRadioGroupOwnProps } from './RadioGroupProps';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Radio } from '@/components/atoms/Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.5rem',
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => sbHandleEvent('change', args),
} satisfies Partial<IRadioGroupOwnProps>;

const ControlledRadioGroup: React.FC<IRadioGroupOwnProps> = (props) => {
  const [value, setValue] = useState<string | undefined>('2');

  return (
    <RadioGroup
      {...props}
      value={value}
      onChange={(_, value) => setValue(value)}
    >
      <Radio aria-label='First radio' value='1' />
      <Radio aria-label='Second radio' value='2' />
      <Radio aria-label='Third radio' value='3' />
    </RadioGroup>
  );
};

const UncontrolledRadioGroup: React.FC<IRadioGroupOwnProps> = (props) => (
  <RadioGroup {...props} defaultValue='2'>
    <Radio aria-label='First radio' value='1' />
    <Radio aria-label='Second radio' value='2' />
    <Radio aria-label='Third radio' value='3' />
  </RadioGroup>
);

export const Controlled: IStory = {
  render: (props) => (
    <ComponentShowcase component={ControlledRadioGroup} props={props} />
  ),
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => (
    <ComponentShowcase component={UncontrolledRadioGroup} props={props} />
  ),
  args: defaultArgs,
};

export default meta;
