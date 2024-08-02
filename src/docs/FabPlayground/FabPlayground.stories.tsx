import type { Meta, StoryObj } from '@storybook/react';

import { FabPlayground } from './FabPlayground';

const meta = {
  component: FabPlayground,
} satisfies Meta<typeof FabPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <FabPlayground {...props} />,
};

export default meta;
