import type { Meta, StoryObj } from '@storybook/react';

import type { IAppHeaderProps } from './AppHeader.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { AppHeader } from './AppHeader';

const meta = {
  component: AppHeader,
} satisfies Meta<typeof AppHeader>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <span>Content</span>
      <span>Content</span>
      <span>Content</span>
    </>
  ),
  w: '$128',
  outline: '$xs',
  outlineStyle: 'dashed',
} satisfies Partial<IAppHeaderProps>;

const AppHeaderShowcase = componentShowcaseFactory(AppHeader);

export const Basic: IStory = {
  render: (props) => <AppHeaderShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
