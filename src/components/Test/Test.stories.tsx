import type { Meta, StoryObj } from '@storybook/react';

import type { ITestProps } from './Test.types';
import { Test } from './Test';

const meta = {
  component: Test,
} satisfies Meta<typeof Test>;

type IStory = StoryObj<typeof meta>;

type IItem = {
  name: string;
};

const defaultArgs = {
  items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }],
  itemRenderer: (item) => `Name: ${item.name}`,
} satisfies Partial<ITestProps<IItem>>;

const TestDemo: React.FC<ITestProps<IItem>> = (props) => (
  <Test<IItem> {...props} />
);

export const Basic: IStory = {
  render: (props) => <TestDemo<IItem> {...props} />,
  args: defaultArgs,
};

export default meta;
