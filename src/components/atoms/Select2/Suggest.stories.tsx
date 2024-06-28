import type { Meta, StoryObj } from '@storybook/react';

import { SuggestDemo, type ISuggestDemoProps } from './SuggestDemo';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: SuggestDemo,
} satisfies Meta<typeof SuggestDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISuggestDemoProps>;

export const Basic: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  },
};

export default meta;
