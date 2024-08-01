import type { Meta, StoryObj } from '@storybook/react';

import { IconButtonPlayground } from './IconButtonPlayground';

const meta = {
  component: IconButtonPlayground,
} satisfies Meta<typeof IconButtonPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <IconButtonPlayground {...props} />,
};

export default meta;
