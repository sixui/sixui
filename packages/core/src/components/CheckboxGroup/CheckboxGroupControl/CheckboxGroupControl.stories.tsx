import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICheckboxGroupControlProps } from './CheckboxGroupControl.types';
import { CheckboxCard } from '~/components/CheckboxCard';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { CheckboxGroupControl } from './CheckboxGroupControl';
import { ControlledCheckboxGroupControlDemo } from './CheckboxGroupControl.stories/ControlledCheckboxGroupControlDemo';
import { UncontrolledCheckboxGroupControlDemo } from './CheckboxGroupControl.stories/UncontrolledCheckboxGroupControlDemo';

const meta = {
  component: CheckboxGroupControl,
} satisfies Meta<typeof CheckboxGroupControl>;

type IStory = StoryObj<typeof meta>;

const ITEMS = [
  { value: '1' },
  { value: '2', defaultIndeterminate: true },
  { value: '3', disabled: true },
  { value: '4' },
];

const defaultArgs = {} satisfies Partial<ICheckboxGroupControlProps>;

const changeActions: Array<IComponentPresentation<ICheckboxGroupControlProps>> =
  [
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

const ControlledCheckboxGroupControlDemoShowcase = componentShowcaseFactory(
  ControlledCheckboxGroupControlDemo,
);

const UncontrolledCheckboxGroupControlDemoShowcase = componentShowcaseFactory(
  UncontrolledCheckboxGroupControlDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledCheckboxGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <CheckboxGroupControl.Item key={itemIndex} {...item} />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const ControlledCard: IStory = {
  render: (props) => (
    <ControlledCheckboxGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <CheckboxCard
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
    <UncontrolledCheckboxGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <CheckboxGroupControl.Item key={itemIndex} {...item} />
          )),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const UncontrolledCard: IStory = {
  render: (props) => (
    <UncontrolledCheckboxGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <CheckboxGroupControl.Card
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
