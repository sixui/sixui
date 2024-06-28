import type { Meta, StoryObj } from '@storybook/react';

import {
  FloatingFilteredListExample,
  type IFloatingFilteredListExampleProps,
} from './FloatingFilteredListExample';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: FloatingFilteredListExample,
} satisfies Meta<typeof FloatingFilteredListExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IFloatingFilteredListExampleProps>;

export const Basic: IStory = {
  render: (props) => <FloatingFilteredListExample {...props} />,
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  },
};

export default meta;
