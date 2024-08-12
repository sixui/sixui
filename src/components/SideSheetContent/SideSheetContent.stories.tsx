import type { Meta, StoryObj } from '@storybook/react';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { SideSheetContent } from './SideSheetContent';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'SideSheetContent',
} satisfies Partial<ISideSheetContentProps>;

export const Basic: IStory = {
  render: (props) => <SideSheetContent {...props} />,
  args: defaultArgs,
};

export default meta;
