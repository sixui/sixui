import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioGroupControlProps } from './RadioGroupControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Radio } from '~/components/Radio';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { RadioGroupControl } from './RadioGroupControl';
import { ControlledRadioGroupControlDemo } from './RadioGroupControl.stories/ControlledRadioGroupControlDemo';
import { UncontrolledRadioGroupControlDemo } from './RadioGroupControl.stories/UncontrolledRadioGroupControlDemo';

const meta = {
  component: RadioGroupControl,
} satisfies Meta<typeof RadioGroupControl>;

type IStory = StoryObj<typeof meta>;

const ITEMS = [
  { value: '1' },
  { value: '2' },
  { value: '3', disabled: true },
  { value: '4' },
];

const defaultArgs = {} satisfies Partial<IRadioGroupControlProps>;

const changeActions: Array<IComponentPresentation<IRadioGroupControlProps>> = [
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

const ControlledRadioGroupControlDemoShowcase = componentShowcaseFactory(
  ControlledRadioGroupControlDemo,
);

const UncontrolledRadioGroupControlDemoShowcase = componentShowcaseFactory(
  UncontrolledRadioGroupControlDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledRadioGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => <Radio key={itemIndex} {...item} />),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const ControlledCard: IStory = {
  render: (props) => (
    <ControlledRadioGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <RadioGroupControl.Card
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
    <UncontrolledRadioGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => <Radio key={itemIndex} {...item} />),
      }}
      rows={changeActions}
    />
  ),
  args: defaultArgs,
};

export const UncontrolledCard: IStory = {
  render: (props) => (
    <UncontrolledRadioGroupControlDemoShowcase
      props={{
        ...props,
        optionsRenderer: () =>
          ITEMS.map((item, itemIndex) => (
            <RadioGroupControl.Card
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
