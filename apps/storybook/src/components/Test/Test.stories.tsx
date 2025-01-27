import type { Meta, StoryObj } from '@storybook/react';
import { Button, IButtonProps } from '@sixui/core';

import '@sixui/core/index.css';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Hello World!',
} satisfies Partial<IButtonProps>;

export const Basic: IStory = {
  render: (props) => <Button {...props} />,
  args: defaultArgs,
};

export default meta;
