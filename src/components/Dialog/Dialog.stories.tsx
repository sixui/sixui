import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IDialogProps } from './Dialog.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { TextInputField } from '../TextInputField';
import { Stack } from '../Stack';
import { Dialog } from './Dialog';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<IDialogProps>;

type IStory = StoryObj<IDialogProps>;

const defaultArgs = {} satisfies Partial<IDialogProps>;

const DialogDemo: React.FC<IDialogProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Open</Button>
      <Dialog
        {...props}
        opened={opened}
        headline='Permanently delete?'
        onClose={close}
        actions={({ close }) => (
          <>
            <Button variant='text' onClick={close}>
              Cancel
            </Button>
            <Button
              type='submit'
              onClick={(...args) =>
                sbHandleEvent('save', args, 1000).then(() => close())
              }
            >
              Delete
            </Button>
          </>
        )}
      >
        Deleting the selected messages will also remove them from all synced
        devices.
      </Dialog>
    </>
  );
};

export const Standard: IStory = {
  render: (props) => <DialogDemo {...props} />,
  args: defaultArgs,
};

const FormDialogDemo: React.FC<IDialogProps> = (props) => {
  const [name, setName] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Dialog
        {...props}
        ref={formRef}
        as='form'
        opened={opened}
        onClose={close}
        headline="What's your name?"
        actions={({ close }) => (
          <>
            <Button variant='text' onClick={close}>
              Cancel
            </Button>
            <Button
              type='submit'
              onClick={(event, ...args) => {
                event.preventDefault();

                return sbHandleEvent('save', [event, ...args], 1000).then(
                  () => {
                    const formData = formRef.current
                      ? new FormData(formRef.current)
                      : undefined;
                    const formValues = formData
                      ? Object.fromEntries(formData)
                      : undefined;
                    setName(formValues?.name.toString());
                    close();
                  },
                );
              }}
            >
              Save
            </Button>
          </>
        )}
      >
        <TextInputField name='name' />
      </Dialog>

      <Stack horizontal gap={4}>
        <Button onClick={open}>Open</Button>
        {name ? (
          <div>
            Hello, <strong>{name}</strong>!
          </div>
        ) : null}
      </Stack>
    </>
  );
};

export const StandardWithForm: IStory = {
  render: (props) => <FormDialogDemo {...props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <DialogDemo {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export default meta;
