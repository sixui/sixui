import type { Meta, StoryObj } from '@storybook/react';

import { MultiSelectDemo, type IMultiSelectDemoProps } from './MultiSelectDemo';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: MultiSelectDemo,
} satisfies Meta<typeof MultiSelectDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IMultiSelectDemoProps>;

export const Basic: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  },
};

export default meta;
