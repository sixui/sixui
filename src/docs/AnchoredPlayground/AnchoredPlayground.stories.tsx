import type { Meta, StoryObj } from '@storybook/react';

import { AnchoredPlayground } from './AnchoredPlayground';

const meta = {
  component: AnchoredPlayground,
} satisfies Meta<typeof AnchoredPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <AnchoredPlayground {...props} />,
};

export default meta;
