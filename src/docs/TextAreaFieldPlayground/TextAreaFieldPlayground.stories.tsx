import type { Meta, StoryObj } from '@storybook/react';

import { TextAreaFieldPlayground } from './TextAreaFieldPlayground';

const meta = {
  component: TextAreaFieldPlayground,
} satisfies Meta<typeof TextAreaFieldPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <TextAreaFieldPlayground {...props} />,
};

export default meta;
