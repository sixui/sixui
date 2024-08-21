import type { Meta, StoryObj } from '@storybook/react';

import type { INavigationDrawerContentProps } from './NavigationDrawerContent.types';
import { NavigationDrawerContent } from './NavigationDrawerContent';

const meta = {
  component: NavigationDrawerContent,
} satisfies Meta<typeof NavigationDrawerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationDrawerContent',
} satisfies Partial<INavigationDrawerContentProps>;

export const Basic: IStory = {
  render: (props) => <NavigationDrawerContent {...props} />,
  args: defaultArgs,
};

export default meta;
