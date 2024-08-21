import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IRadioGroupProps } from './RadioGroup.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ComponentShowcase } from '../ComponentShowcase';
import { Radio } from '../Radio';
import { Button } from '../Button';
import { RadioGroup } from './RadioGroup';
import { Stack } from '../Stack';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args),
} satisfies Partial<IRadioGroupProps>;

const ControlledRadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | undefined>('2');

  return (
    <Stack horizontal gap={6}>
      <RadioGroup
        {...props}
        as={Stack}
        horizontal
        gap={6}
        value={value}
        onChange={(_, value) => setValue(value)}
        ref={ref}
      >
        <Radio value='1' />
        <Radio value='2' />
        <Radio value='3' disabled />
        <Radio value='4' />
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Stack>
  );
};

const UncontrolledRadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <RadioGroup {...props} defaultValue='2' ref={ref}>
        <Radio value='1' />
        <Radio value='2' />
        <Radio value='3' disabled />
        <Radio value='4' />
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </>
  );
};

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
