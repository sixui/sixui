import type { Meta, StoryObj } from '@storybook/react';

import { TextFieldBasePlayground } from './TextFieldBasePlayground';

const meta = {
  component: TextFieldBasePlayground,
} satisfies Meta<typeof TextFieldBasePlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <TextFieldBasePlayground {...props} />,
};

export default meta;
