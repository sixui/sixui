import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IRadioGroupProps } from './RadioGroup.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { Radio } from '../Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioGroupProps>;

const ControlledRadioGroupDemo: React.FC<IRadioGroupProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<IRadioGroupProps['value']>('2');

  return (
    <Flex direction="row" gap="$8" align="center">
      <RadioGroup
        {...props}
        as={Flex}
        direction="row"
        gap="$8"
        value={value}
        onChange={(_event, value) =>
          sbHandleEvent('onChange', [_event, value], 1000).then(() =>
            setValue(value),
          )
        }
        ref={ref}
      >
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" disabled />
        <Radio value="4" />
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const ControlledRadioGroupDemoShowcase = componentShowcaseFactory(
  ControlledRadioGroupDemo,
);

const UncontrolledRadioGroupDemo: React.FC<IRadioGroupProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="row" gap="$8" align="center">
      <RadioGroup
        {...props}
        as={Flex}
        direction="row"
        gap="$8"
        defaultValue="2"
        onChange={(_event, value) =>
          sbHandleEvent('onChange', [_event, value], 1000)
        }
        ref={ref}
      >
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" disabled />
        <Radio value="4" />
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const UncontrolledRadioGroupDemoShowcase = componentShowcaseFactory(
  UncontrolledRadioGroupDemo,
);

export const Controlled: IStory = {
  render: (props) => <ControlledRadioGroupDemoShowcase props={props} />,
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => <UncontrolledRadioGroupDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
