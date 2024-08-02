import type { Meta, StoryObj } from '@storybook/react';

import { TextInputFieldPlayground } from './TextInputFieldPlayground';

const meta = {
  component: TextInputFieldPlayground,
} satisfies Meta<typeof TextInputFieldPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <TextInputFieldPlayground {...props} />,
};

export default meta;
