import type { Meta, StoryObj } from '@storybook/react';

import { AssistChipPlayground } from './AssistChipPlayground';

const meta = {
  component: AssistChipPlayground,
} satisfies Meta<typeof AssistChipPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <AssistChipPlayground {...props} />,
};

export default meta;
