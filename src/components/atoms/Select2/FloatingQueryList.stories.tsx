import type { Meta, StoryObj } from '@storybook/react';

import {
  FloatingQueryListDemo,
  type IFloatingQueryListDemoProps,
} from './FloatingQueryListDemo';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: FloatingQueryListDemo,
} satisfies Meta<typeof FloatingQueryListDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IFloatingQueryListDemoProps>;

export const Basic: IStory = {
  render: (props) => <FloatingQueryListDemo {...props} />,
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  },
};

export default meta;
