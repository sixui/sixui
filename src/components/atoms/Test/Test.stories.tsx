import type { Meta, StoryObj } from '@storybook/react';

import { Test, type ITestProps } from './Test';

const meta = {
  component: Test,
} satisfies Meta<typeof Test>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Test',
} satisfies Partial<ITestProps>;

export const Basic: IStory = {
  render: (props) => <Test {...props} />,
  args: defaultArgs,
};

export default meta;
