import type { Meta, StoryObj } from '@storybook/react';

import { ScrimPlayground } from './ScrimPlayground';

const meta = {
  component: ScrimPlayground,
} satisfies Meta<typeof ScrimPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <ScrimPlayground {...props} />,
};

export default meta;
