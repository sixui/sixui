import type { Meta, StoryObj } from '@storybook/react';

import { FieldBasePlayground } from './FieldBasePlayground';

const meta = {
  component: FieldBasePlayground,
} satisfies Meta<typeof FieldBasePlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <FieldBasePlayground {...props} />,
};

export default meta;
