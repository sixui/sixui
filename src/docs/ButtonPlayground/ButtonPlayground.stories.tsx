import type { Meta, StoryObj } from '@storybook/react';

import { ButtonPlayground } from './ButtonPlayground';

const meta = {
  component: ButtonPlayground,
} satisfies Meta<typeof ButtonPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <ButtonPlayground {...props} />,
};

export default meta;
