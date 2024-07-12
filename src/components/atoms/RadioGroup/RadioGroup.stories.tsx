import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useRef, useState } from 'react';

import type { IRadioGroupOwnProps } from './RadioGroupProps';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Radio } from '@/components/atoms/Radio';
import { Button } from '@/components/atoms/Button';
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
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | undefined>('2');

  return (
    <>
      <RadioGroup
        {...props}
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
    </>
  );
};

const UncontrolledRadioGroup: React.FC<IRadioGroupOwnProps> = (props) => {
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
