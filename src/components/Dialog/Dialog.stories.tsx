import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IDialogProps } from './Dialog.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
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

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<IDialogProps>;

export const Uncontrolled: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    headline: 'Permanently delete?',
    children:
      'Deleting the selected messages will also remove them from all synced devices.',
    actions: ({ close }) => (
      <>
        <Button variant='text' onClick={close}>
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={(...args) =>
            sbHandleEvent('delete', args, 1000).then((args) => close(...args))
          }
        >
          Delete
        </Button>
      </>
    ),
    trigger: <Button>Open</Button>,
  },
};

const ControlledDialogDemo: React.FC<IDialogProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open</Button>
      <Dialog
        {...props}
        opened={opened}
        headline='Permanently delete?'
        onOpenChange={setOpened}
        actions={({ close }) => (
          <>
            <Button variant='text' onClick={close}>
              Cancel
            </Button>
            <Button
              type='submit'
              onClick={(...args) =>
                sbHandleEvent('save', args, 1000).then((args) => close(...args))
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

export const Controlled: IStory = {
  render: (props) => <ControlledDialogDemo {...props} />,
  args: defaultArgs,
};

const FormDialogDemo: React.FC<IDialogProps> = (props) => {
  const [name, setName] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Stack horizontal gap={4}>
      <Dialog
        {...props}
        ref={formRef}
        as='form'
        trigger={<Button>Open</Button>}
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
                    close(event);
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
      {name ? (
        <div>
          Hello, <strong>{name}</strong>!
        </div>
      ) : null}
    </Stack>
  );
};

export const Form: IStory = {
  render: (props) => <FormDialogDemo {...props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <Dialog {...props} />,
  args: {
    ...defaultArgs,
    headline: 'Permanently delete?',
    children:
      'Deleting the selected messages will also remove them from all synced devices.',
    actions: ({ close }) => (
      <>
        <Button variant='text' onClick={close}>
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={(...args) =>
            sbHandleEvent('delete', args, 1000).then((args) => close(...args))
          }
        >
          Delete
        </Button>
      </>
    ),
    trigger: <Button>Open</Button>,
    modal: true,
  },
};

export default meta;
