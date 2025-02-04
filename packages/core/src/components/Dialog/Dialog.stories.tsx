import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { IDialogProps } from './Dialog.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import {
  OverlaysProvider,
  useOverlay,
  useOverlays,
} from '~/components/Overlays';
import { TextInputField } from '~/components/TextInputField';
import { useId } from '~/hooks';
import { useDisclosure } from '~/hooks/useDisclosure';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { OverlayProvider } from '../Overlays/Overlay.context';
import { overlaysGlobals } from '../Overlays/Overlays.globals';
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
const createOverlay = <TProps extends object>(
  Component: React.ComponentType<TProps>,
): React.FC<TProps> => {
  const overlayId = 'xxx';

  const OverlayComponent: React.FC<TProps> = (props: TProps) => (
    <OverlayProvider value={{ id: overlayId }}>
      <Component {...props} />
    </OverlayProvider>
  );

  overlaysGlobals.register({
    id: overlayId,
    component: OverlayComponent,
    layer: 'dialogs',
  });

  return OverlayComponent;
};

// DEV:
const DialogOverlay = createOverlay((props) => {
  const overlay = useOverlay({
    layer: 'dialogs',
  });

  return (
    <Dialog
      {...props}
      opened={overlay.opened}
      onClose={() => {
        overlay.close();
        overlay.resolve();
      }}
    />
  );
});

// DEV:
const TestDemo: React.FC<IDialogProps> = (props: IDialogProps) => {
  const overlays = useOverlays();

  return (
    <OverlaysProvider
    // overlays={{
    //   bbb: {
    //     component: Dialog,
    //     props: {
    //       ...props,
    //       children: 'AAA',
    //     },
    //     layer: 'dialogs',
    //   },
    // }}
    >
      <Button
        onClick={() =>
          overlays.open({
            id: 'xxx',
            component: DialogOverlay,
            props: {
              ...props,
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
                      overlays.open({
                        id: 'xxx-2',
                        component: DialogOverlay,
                        props: {
                          ...props,
                          headline: 'Confirm?',
                          children:
                            'Are you sure you want to delete this thing?',
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
                        },
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              ),
            },
            layer: 'dialogs',
          })
        }
      >
        Show AAA
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

// DEV:
export const Test: IStory = {
  render: (props: IDialogProps) => (
    <OverlaysProvider>
      <TestDemo {...props} />
    </OverlaysProvider>
  ),
  args: {
    ...defaultArgs,
    headline: 'Hello',
  },
};

export default meta;
