import type { Meta, StoryObj } from '@storybook/react';

import {
  MultiComboboxDemo,
  type IMultiComboboxDemoProps,
} from './MultiComboboxDemo';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: MultiComboboxDemo,
} satisfies Meta<typeof MultiComboboxDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IMultiComboboxDemoProps>;

export const Basic: IStory = {
  render: (props) => <MultiComboboxDemo {...props} />,
  args: {
    ...defaultArgs,
    onChange: (...args) => void sbHandleEvent('onChange', args),
    onRemove: (...args) => void sbHandleEvent('onRemove', args),
  },
};

export default meta;
