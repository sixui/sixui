import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IDialogProps } from './Dialog.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import {
  OverlaysProvider,
  registerOverlay,
  useOverlays,
} from '~/components/Overlays';
import { TextInputField } from '~/components/TextInputField';
import { useDisclosure } from '~/hooks/useDisclosure';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Dialog } from './Dialog';
import { DialogOverlay } from './DialogOverlay';

// https://m3.material.io/components/dialogs/overview
// https://material-web.dev/components/dialog/
// https://github.com/material-components/material-web/blob/main/dialog/demo/stories.ts

const meta = {
  component: Dialog,
} satisfies Meta<IDialogProps>;

type IStory = StoryObj<IDialogProps>;

const defaultArgs = {} satisfies Partial<IDialogProps>;

const DialogDemo: React.FC<IDialogProps> = (props) => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={toggle} w="$24">
        {opened ? 'Close' : 'Open'}
      </Button>
      <Dialog
        {...props}
        opened={opened}
        headline="Permanently delete?"
        onClose={close}
        actions={({ close }) => (
          <>
            <Button variant="text" onClick={close}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(...args) =>
                sbHandleEvent('save', args, 500).then(() => void close())
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

const DialogDemoShowcase = componentShowcaseFactory(DialogDemo);

export const Standard: IStory = {
  render: (props) => <DialogDemoShowcase props={props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <DialogDemo {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Jail: IStory = {
  render: (props) => <DialogDemo {...props} />,
  args: {
    ...defaultArgs,
    jail: true,
  },
};

const FormDialogDemo: React.FC<IDialogProps> = (props) => {
  const [name, setName] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Dialog
        {...props}
        ref={formRef}
        as="form"
        opened={opened}
        onClose={close}
        headline="What's your name?"
        size="md"
        actions={({ close }) => (
          <>
            <Button variant="text" onClick={close}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(event, ...args) => {
                event.preventDefault();

                return sbHandleEvent('save', [event, ...args], 500).then(() => {
                  const formData = formRef.current
                    ? new FormData(formRef.current)
                    : undefined;
                  const formValues = formData
                    ? Object.fromEntries(formData)
                    : undefined;
                  setName(
                    typeof formValues?.name === 'string'
                      ? formValues.name
                      : undefined,
                  );
                  close();
                });
              }}
            >
              Save
            </Button>
          </>
        )}
      >
        <TextInputField name="name" />
      </Dialog>

      <Flex direction="row" gap="$4" align="center">
        <Button onClick={toggle} w="$24">
          {opened ? 'Close' : 'Open'}
        </Button>
        {name && (
          <div>
            Hello, <strong>{name}</strong>!
          </div>
        )}
      </Flex>
    </>
  );
};

export const WithForm: IStory = {
  render: (props) => <FormDialogDemo {...props} />,
  args: {
    ...defaultArgs,
    jail: true,
  },
};

// DEV:
const DialogOverlay2 = registerOverlay<IDialogProps>(
  (props) => <DialogOverlay {...props} headline="HELLLELKSDLDKLQSKD" />,
  { layer: 'dialogs' },
);

// DEV:
const TestDemo: React.FC<IDialogProps> = (props: IDialogProps) => {
  const overlays = useOverlays();

  return (
    <OverlaysProvider
      overlays={{
        bbb: {
          component: DialogOverlay,
          props: {
            ...props,
            children: 'AAA',
          },
          layer: 'dialogs',
        },
      }}
    >
      <Button
        onClick={() =>
          overlays.open(DialogOverlay, {
            ...props,
            // modal: true,
            headline: 'Delete?',
            children:
              'Do you want to delete this thing? This may be a very important thing. So choose carefully.',
            opened: true,
            actions: ({ close }) => (
              <>
                <Button variant="text" onClick={close}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() =>
                    overlays.open(DialogOverlay, {
                      ...props,
                      headline: 'Confirm?',
                      children: 'Are you sure you want to delete this thing?',
                      opened: true,
                      actions: ({ close }) => (
                        <>
                          <Button variant="text" onClick={close}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => {
                              // DELETE
                            }}
                          >
                            Yes
                          </Button>
                        </>
                      ),
                    })
                  }
                >
                  Delete
                </Button>
              </>
            ),
          })
        }
      >
        Show normal
      </Button>

      <Button
        onClick={() =>
          overlays.open(DialogOverlay2, {
            ...props,
            modal: true,
            headline: 'Delete (bis)?',
            children:
              'Do you want to delete this thing? This may be a very important thing. So choose carefully.',
            opened: true,
            actions: ({ close }) => (
              <>
                <Button variant="text" onClick={close}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() =>
                    overlays.open(DialogOverlay, {
                      ...props,
                      headline: 'Confirm (bis)?',
                      children: 'Are you sure you want to delete this thing?',
                      opened: true,
                      modal: true,
                      actions: ({ close }) => (
                        <>
                          <Button variant="text" onClick={close}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => {
                              // DELETE
                            }}
                          >
                            Yes
                          </Button>
                        </>
                      ),
                    })
                  }
                >
                  Delete
                </Button>
              </>
            ),
          })
        }
      >
        Show modal
      </Button>

      {/* <Button
        onClick={() =>
          overlays.open({
            id: 'bbb',
            props: {
              headline: 'Hello BBB',
            },
          })
        }
      >
        Show BBB
      </Button> */}
    </OverlaysProvider>
  );
};

export const AsOverlay: IStory = {
  render: (props: IDialogProps) => (
    <OverlaysProvider>
      <TestDemo {...props} />
    </OverlaysProvider>
  ),
  args: defaultArgs,
};

export default meta;
