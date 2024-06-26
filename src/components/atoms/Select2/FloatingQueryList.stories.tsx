import type { Meta, StoryObj } from '@storybook/react';

import {
  FloatingQueryListDemo,
  type IFloatingQueryListDemoProps,
} from './FloatingQueryListDemo';

const meta = {
  component: FloatingQueryListDemo,
} satisfies Meta<typeof FloatingQueryListDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IFloatingQueryListDemoProps>;

export const Basic: IStory = {
  render: (props) => <FloatingQueryListDemo {...props} />,
  args: {
    ...defaultArgs,
  },
};

export default meta;
