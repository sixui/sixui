import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { SelectExample, type ISelectExampleProps } from './SelectExample';

const meta = {
  component: SelectExample,
} satisfies Meta<typeof SelectExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  matchTargetWidth: true,
} satisfies Partial<ISelectExampleProps>;

export const Basic: IStory = {
  render: (props) => <SelectExample {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <SelectExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export default meta;
