import type { Meta, StoryObj } from '@storybook/react';

import { FieldPlayground } from './FieldPlayground';

const meta = {
  component: FieldPlayground,
} satisfies Meta<typeof FieldPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <FieldPlayground {...props} />,
};

export default meta;
