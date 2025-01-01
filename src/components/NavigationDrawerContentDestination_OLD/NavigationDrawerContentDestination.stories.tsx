import type { Meta, StoryObj } from '@storybook/react';

import type { INavigationDrawerContentDestinationProps } from './NavigationDrawerContentDestination.types';
import { NavigationDrawerContentDestination } from './NavigationDrawerContentDestination';

const meta = {
  component: NavigationDrawerContentDestination,
} satisfies Meta<typeof NavigationDrawerContentDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationDrawerContentDestination',
} satisfies Partial<INavigationDrawerContentDestinationProps>;

export const Basic: IStory = {
  render: (props) => <NavigationDrawerContentDestination {...props} />,
  args: defaultArgs,
};

export default meta;
