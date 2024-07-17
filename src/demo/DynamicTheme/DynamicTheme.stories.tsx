import type { Meta, StoryObj } from '@storybook/react';

import type { IDynamicThemeProps } from './DynamicTheme.types';
import { Button } from '@/components/Button';
import { DynamicTheme } from './DynamicTheme';

const meta = {
  component: DynamicTheme,
} satisfies Meta<typeof DynamicTheme>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Button>Hello</Button>,
} satisfies Partial<IDynamicThemeProps>;

export const Basic: IStory = {
  render: (props) => <DynamicTheme {...props} />,
  args: defaultArgs,
};

export default meta;
