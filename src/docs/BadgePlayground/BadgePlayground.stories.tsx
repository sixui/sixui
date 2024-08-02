import type { Meta, StoryObj } from '@storybook/react';

import { BadgePlayground } from './BadgePlayground';

const meta = {
  component: BadgePlayground,
} satisfies Meta<typeof BadgePlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <BadgePlayground {...props} />,
};

export default meta;
