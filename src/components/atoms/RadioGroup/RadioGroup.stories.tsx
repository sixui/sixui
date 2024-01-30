import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from '@/components/molecules/ComponentShowcase';
import { type IRadioGroupProps, RadioGroup } from './RadioGroup';
import { Radio } from '../Radio';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioGroupProps>;

const ControlledRadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const [value, setValue] = React.useState<string | undefined>('2');

  return (
    <RadioGroup {...props} value={value} onChange={setValue}>
      <Radio aria-label='First radio' value='1' />
      <Radio aria-label='Second radio' value='2' />
      <Radio aria-label='Third radio' value='3' />
    </RadioGroup>
  );
};

const UncontrolledRadioGroup: React.FC<IRadioGroupProps> = (props) => (
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
