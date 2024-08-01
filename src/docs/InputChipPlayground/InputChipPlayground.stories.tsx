import type { Meta, StoryObj } from '@storybook/react';

import { InputChipPlayground } from './InputChipPlayground';

const meta = {
  component: InputChipPlayground,
} satisfies Meta<typeof InputChipPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <InputChipPlayground {...props} />,
};

export default meta;
