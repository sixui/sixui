import type { Meta, StoryObj } from '@storybook/react';

import type { IDisclosureProps } from './Disclosure.types';
import type { IDisclosureTriggerProps } from './DisclosureTrigger';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Disclosure } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et leo duis ut diam quam nulla porttitor. Tortor dignissim convallis aenean et tortor. Vulputate mi sit amet mauris commodo. Ac turpis egestas sed tempus.';

const TriggerDemo: React.FC<IDisclosureTriggerProps> = (props) => (
  <Disclosure.Trigger
    onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
    onChange={(...args) => sbHandleEvent('onChange', args, 1000)}
    {...props}
  >
    Advanced options
  </Disclosure.Trigger>
);

const defaultArgs = {
  trigger: <TriggerDemo />,
  children: <Text>{TEXT}</Text>,
  onChange: (...args) => void sbHandleEvent('onChange', args),
  w: '$96',
} satisfies Partial<IDisclosureProps>;

const DisclosureShowcase = componentShowcaseFactory(Disclosure);

export const Basic: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: defaultArgs,
};

export const Disabled: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const DefaultExpanded: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: {
    ...defaultArgs,
    defaultExpanded: true,
  },
};

export const Checkable: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: {
    ...defaultArgs,
    trigger: <TriggerDemo checkable>Advanced options</TriggerDemo>,
  },
};

export const CheckableDefaultExpanded: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: {
    ...defaultArgs,
    trigger: (
      <TriggerDemo checkable defaultChecked>
        Advanced options
      </TriggerDemo>
    ),
    defaultExpanded: true,
  },
};

export const Switchable: IStory = {
  render: (props) => <DisclosureShowcase props={props} />,
  args: {
    ...defaultArgs,
    trigger: (
      <TriggerDemo switchable defaultChecked>
        Advanced options
      </TriggerDemo>
    ),
  },
};

export default meta;
