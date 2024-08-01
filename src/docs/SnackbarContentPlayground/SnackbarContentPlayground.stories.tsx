import type { Meta, StoryObj } from '@storybook/react';

import { SnackbarContentPlayground } from './SnackbarContentPlayground';

const meta = {
  component: SnackbarContentPlayground,
} satisfies Meta<typeof SnackbarContentPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <SnackbarContentPlayground {...props} />,
};

export default meta;
