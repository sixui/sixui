import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IDialogProps } from './Dialog.types';
import type { IDialogOverlayProps } from './DialogOverlay';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { TextInputField } from '~/components/TextInputField';
import { useDisclosure } from '~/hooks/useDisclosure';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Dialog } from './Dialog';
import { DialogOverlay } from './DialogOverlay';

const meta = {
  component: Dialog,
} satisfies Meta<IDialogProps>;

type IStory = StoryObj<IDialogProps>;

const defaultArgs = {} satisfies Partial<IDialogProps>;

const DialogDemo: React.FC<IDialogProps> = (props) => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={toggle} w="96px">
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

      <Flex direction="row" gap="$lg" align="center">
        <Button onClick={toggle} w="96px">
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

const AsOverlayDemo: React.FC<IDialogOverlayProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Button
      onClick={() =>
        overlays.open(DialogOverlay, {
          ...props,
          modal: true,
          headline: 'Basic dialog title',
          children:
            'A dialog is a window that appears in front of app content to provide information, or ask for a decision.',
          actions: ({ close }) => (
            <>
              <Button variant="text" onClick={close}>
                I don't agree
              </Button>
              <Button onClick={close}>I agree</Button>
            </>
          ),
        })
      }
    >
      Open
    </Button>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props: IDialogProps) => <AsOverlayDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
