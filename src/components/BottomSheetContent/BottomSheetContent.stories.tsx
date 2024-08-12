import type { Meta, StoryObj } from '@storybook/react';

import type { IBottomSheetContentProps } from './BottomSheetContent.types';
import { BottomSheetContent } from './BottomSheetContent';

const meta = {
  component: BottomSheetContent,
} satisfies Meta<typeof BottomSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'BottomSheetContent',
} satisfies Partial<IBottomSheetContentProps>;

export const Basic: IStory = {
  render: (props) => <BottomSheetContent {...props} />,
  args: defaultArgs,
};

export default meta;
