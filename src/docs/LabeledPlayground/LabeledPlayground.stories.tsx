import type { Meta, StoryObj } from '@storybook/react';

import { LabeledPlayground } from './LabeledPlayground';

const meta = {
  component: LabeledPlayground,
} satisfies Meta<typeof LabeledPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <LabeledPlayground {...props} />,
};

export default meta;
