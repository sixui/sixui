import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import { Dialog, type IDialogProps } from './Dialog';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
} satisfies Partial<IDialogProps>;

export const Basic: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faStar} />,
    headline: 'Headline',
    content:
      'Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog. Just a simple dialog.',
    actions: 'Actions',
    scrollable: true,
  },
};

export default meta;
