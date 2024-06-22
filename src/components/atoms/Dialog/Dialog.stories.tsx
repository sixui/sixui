import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from './Dialog';
import { Button } from '../Button';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {};

export const Basic: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    button: <Button>Open</Button>,
    headline: 'Permanently delete?',
    children:
      'Deleting the selected messages will also remove them from all synced devices.',
    actions: <Button>Cancel</Button>
  },
};

export default meta;
