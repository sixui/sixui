import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IDisclosureProps } from './Disclosure.types';
import { DisclosureButton } from '../DisclosureButton';
import { Text } from '../Text';
import { Disclosure } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 680,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et leo duis ut diam quam nulla porttitor. Tortor dignissim convallis aenean et tortor. Vulputate mi sit amet mauris commodo. Ac turpis egestas sed tempus. Id nibh tortor id aliquet lectus. Sed risus pretium quam vulputate. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Viverra ipsum nunc aliquet bibendum enim. Mauris in aliquam sem fringilla. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Nec feugiat nisl pretium fusce id velit. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. At augue eget arcu dictum varius duis at. In fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Sem fringilla ut morbi tincidunt augue interdum. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.';

const defaultArgs = {
  trigger: <DisclosureButton>Advanced options</DisclosureButton>,
  children: <Text>{TEXT}</Text>,
  sx: styles.host,
} satisfies Partial<IDisclosureProps>;

export const Basic: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: defaultArgs,
};

export const Disabled: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const DefaultExpanded: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    defaultExpanded: true,
  },
};

export const Checkable: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    trigger: <DisclosureButton checkable>Advanced options</DisclosureButton>,
  },
};

export const CheckableDefaultExpanded: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    trigger: <DisclosureButton checkable>Advanced options</DisclosureButton>,
    defaultExpanded: true,
  },
};

export const Switchable: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    trigger: <DisclosureButton switchable>Advanced options</DisclosureButton>,
  },
};

export default meta;
