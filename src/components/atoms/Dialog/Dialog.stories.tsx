import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Dialog, type IDialogOwnProps, type IDialogProps } from './Dialog';
import { Button } from '../Button';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  headline: 'Permanently delete?',
  children:
    'Deleting the selected messages will also remove them from all synced devices.',
};

const DialogLauncher: React.FC<IDialogOwnProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      <Dialog
        {...props}
        actions={
          <>
            <Button variant='text'>Cancel</Button>
            <Button variant='danger'>Delete</Button>
          </>
        }
        open={open}
        onClose={handleClose}
      />
      <Button onClick={handleOpen}>Open</Button>
    </>
  );
};

export const Basic: IStory = {
  render: (props) => <DialogLauncher {...props} />,
  args: defaultArgs as IDialogProps,
};

export default meta;
