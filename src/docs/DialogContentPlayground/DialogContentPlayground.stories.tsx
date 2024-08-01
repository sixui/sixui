import type { Meta, StoryObj } from '@storybook/react';

import { DialogContentPlayground } from './DialogContentPlayground';

const meta = {
  component: DialogContentPlayground,
} satisfies Meta<typeof DialogContentPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <DialogContentPlayground {...props} />,
};

export default meta;
