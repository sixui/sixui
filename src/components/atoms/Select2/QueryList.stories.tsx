import type { Meta, StoryObj } from '@storybook/react';

import { QueryListDemo, type IQueryListDemoProps } from './QueryListDemo';

const meta = {
  component: QueryListDemo,
} satisfies Meta<typeof QueryListDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IQueryListDemoProps>;

export const Basic: IStory = {
  render: (props) => <QueryListDemo {...props} />,
  args: {
    ...defaultArgs,
  },
};

export default meta;
