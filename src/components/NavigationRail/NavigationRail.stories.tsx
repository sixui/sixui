import type { Meta, StoryObj } from '@storybook/react';

import type { INavigationRailProps } from './NavigationRail.types';
import { NavigationRail } from './NavigationRail';

const meta = {
  component: NavigationRail,
} satisfies Meta<typeof NavigationRail>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationRail',
} satisfies Partial<INavigationRailProps>;

export const Basic: IStory = {
  render: (props) => <NavigationRail {...props} />,
  args: defaultArgs,
};

export default meta;
