import type { Meta, StoryObj } from '@storybook/react';

import { AvatarPlayground } from './AvatarPlayground';

const meta = {
  component: AvatarPlayground,
} satisfies Meta<typeof AvatarPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <AvatarPlayground {...props} />,
};

export default meta;
