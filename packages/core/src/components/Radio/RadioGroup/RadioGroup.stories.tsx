import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioGroupProps } from './RadioGroup.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { Radio } from '~/components/Radio';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { RadioGroup } from './RadioGroup';

interface IRadioGroupDemoProps extends IRadioGroupProps {
  optionsRenderer: () => React.ReactNode;
}

const meta = {
  component: RadioGroup,
} satisfies Meta<IRadioGroupDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioGroupProps>;

const items = [
  { value: '1' },
  { value: '2' },
  { value: '3', disabled: true },
  { value: '4' },
];

const changeActions: Array<IComponentPresentation<IRadioGroupProps>> = [
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

const ControlledRadioGroupDemo: React.FC<IRadioGroupDemoProps> = (props) => {
  const { optionsRenderer, onChange, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('2');

  return (
    <Flex direction="row" gap="$xl" align="center">
      <RadioGroup
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        value={value}
        onChange={async (value) => {
          await onChange?.(value);
          setValue(value ?? '');
        }}
        ref={ref}
      >
        {optionsRenderer()}
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const ControlledRadioGroupDemoShowcase = componentShowcaseFactory(
  ControlledRadioGroupDemo,
);

const UncontrolledRadioGroupDemo: React.FC<IRadioGroupDemoProps> = (props) => {
  const { optionsRenderer, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <RadioGroup
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        defaultValue="2"
        ref={ref}
      >
        {optionsRenderer()}
      </RadioGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const UncontrolledRadioGroupDemoShowcase = componentShowcaseFactory(
  UncontrolledRadioGroupDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledRadioGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => <Radio key={itemIndex} {...item} />),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const ControlledCard: IStory = {
  render: (props) => (
    <ControlledRadioGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Radio.Card
              w="224px"
              key={itemIndex}
              label={`Item ${itemIndex + 1}`}
              supportingText="This text explains more about the option shown in the card."
              {...item}
            />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const Uncontrolled: IStory = {
  render: (props) => (
    <UncontrolledRadioGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => <Radio key={itemIndex} {...item} />),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const UncontrolledCard: IStory = {
  render: (props) => (
    <UncontrolledRadioGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Radio.Card
              w="224px"
              key={itemIndex}
              label={`Item ${itemIndex + 1}`}
              supportingText="This text explains more about the option shown in the card."
              {...item}
            />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export default meta;
