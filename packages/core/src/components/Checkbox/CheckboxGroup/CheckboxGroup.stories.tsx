import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICheckboxGroupProps } from './CheckboxGroup.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { CheckboxGroup } from './CheckboxGroup';

interface ICheckboxGroupDemoProps extends ICheckboxGroupProps {
  optionsRenderer: () => React.ReactNode;
}

const meta = {
  component: CheckboxGroup,
} satisfies Meta<ICheckboxGroupDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICheckboxGroupProps>;

const items = [
  { value: '1' },
  { value: '2', defaultIndeterminate: true },
  { value: '3', disabled: true },
  { value: '4' },
];

const changeActions: Array<IComponentPresentation<ICheckboxGroupProps>> = [
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

const ControlledCheckboxGroupDemo: React.FC<ICheckboxGroupDemoProps> = (
  props,
) => {
  const { optionsRenderer, onChange, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Array<string>>(['2', '4']);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <CheckboxGroup
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        values={values}
        onChange={async (values, event) => {
          await onChange?.(values, event);
          setValues(values);
        }}
        ref={ref}
      >
        {optionsRenderer()}
      </CheckboxGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const ControlledCheckboxGroupDemoShowcase = componentShowcaseFactory(
  ControlledCheckboxGroupDemo,
);

const UncontrolledCheckboxGroupDemo: React.FC<ICheckboxGroupDemoProps> = (
  props,
) => {
  const { optionsRenderer, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <CheckboxGroup
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        defaultValues={['2', '4']}
        ref={ref}
      >
        {optionsRenderer()}
      </CheckboxGroup>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};

const UncontrolledCheckboxGroupDemoShowcase = componentShowcaseFactory(
  UncontrolledCheckboxGroupDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledCheckboxGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Checkbox key={itemIndex} {...item} />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const ControlledCard: IStory = {
  render: (props) => (
    <ControlledCheckboxGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Checkbox.Card
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
    <UncontrolledCheckboxGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Checkbox key={itemIndex} {...item} />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const UncontrolledCard: IStory = {
  render: (props) => (
    <UncontrolledCheckboxGroupDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          items.map((item, itemIndex) => (
            <Checkbox.Card
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
