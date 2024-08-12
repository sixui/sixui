import type { Meta, StoryObj } from '@storybook/react';

import type { INavigationDrawerProps } from './NavigationDrawer.types';
import { NavigationDrawer } from './NavigationDrawer';

const meta = {
  component: NavigationDrawer,
} satisfies Meta<typeof NavigationDrawer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationDrawer',
} satisfies Partial<INavigationDrawerProps>;

export const Basic: IStory = {
  render: (props) => <NavigationDrawer {...props} />,
  args: defaultArgs,
};

export default meta;
