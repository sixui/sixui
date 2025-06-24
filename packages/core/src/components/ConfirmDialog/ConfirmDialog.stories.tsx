import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IConfirmDialogProps } from './ConfirmDialog.types';
import type { IConfirmDialogOverlayProps } from './ConfirmDialogOverlay';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { Text } from '~/components/Text';
import { useDisclosure } from '~/hooks/useDisclosure';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { ConfirmDialog } from './ConfirmDialog';
import { ConfirmDialogOverlay } from './ConfirmDialogOverlay';

const meta = {
  component: ConfirmDialog,
} satisfies Meta<IConfirmDialogProps>;

type IStory = StoryObj<IConfirmDialogProps>;

const defaultArgs = {
  onCancel: (...args) => sbHandleEvent('onCancel', args),
  onConfirm: (...args) => sbHandleEvent('onConfirm', args, 1000),
} satisfies Partial<IConfirmDialogProps>;

const ConfirmDialogDemo: React.FC<IConfirmDialogProps> = (props) => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={toggle} w="96px">
        {opened ? 'Close' : 'Open'}
      </Button>
      <ConfirmDialog
        {...props}
        opened={opened}
        headline="Permanently delete?"
        onClose={close}
      >
        Deleting the selected messages will also remove them from all synced
        devices.
      </ConfirmDialog>
    </>
  );
};

const ConfirmDialogDemoShowcase = componentShowcaseFactory(ConfirmDialogDemo);

export const Standard: IStory = {
  render: (props) => <ConfirmDialogDemoShowcase props={props} />,
  args: defaultArgs,
};

export const Danger: IStory = {
  render: (props) => <ConfirmDialogDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    danger: true,
  },
};

export const Modal: IStory = {
  render: (props) => <ConfirmDialogDemo {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Jail: IStory = {
  render: (props) => <ConfirmDialogDemo {...props} />,
  args: {
    ...defaultArgs,
    jail: true,
  },
};

const AsOverlayDemo: React.FC<IConfirmDialogOverlayProps> = (props) => {
  const overlays = useOverlays();
  const [result, setResult] = useState<string | undefined>(undefined);

  return (
    <Flex direction="row" gap="$md" align="center">
      <Button
        onClick={() =>
          overlays
            .open(ConfirmDialogOverlay, {
              headline: 'Permanently delete?',
              children:
                'Deleting the selected messages will also remove them from all synced devices.',
              labels: {
                confirm: 'Delete',
              },
              confirmProps: {
                variant: 'danger',
              },
              onConfirm: () =>
                overlays
                  .open(ConfirmDialogOverlay, {
                    headline: 'Mmm...',
                    children: 'If I was you, I would not do that. Continue?',
                    jail: true,
                    labels: {
                      confirm: 'Yes, delete',
                    },
                    confirmProps: {
                      variant: 'danger',
                    },
                    ...props,
                  })
                  .then((confirmed) => {
                    setResult(confirmed ? 'Confirmed' : 'Canceled');
                  }),
            })
            .then((confirmed) => {
              if (!confirmed) {
                setResult('Canceled');
              }
            })
            .catch((error: unknown) => {
              setResult(
                error instanceof Error
                  ? `Error: ${error.message}`
                  : `Unknown error (${typeof error})`,
              );
            })
        }
      >
        Open
      </Button>
      <Text>{result}</Text>
    </Flex>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props) => (
    <AsOverlayDemoShowcase
      horizontalAlign="start"
      props={props}
      rows={[
        { legend: 'Normal' },
        {
          legend: 'Error on confirm',
          props: {
            onConfirm: (...args) =>
              sbHandleEvent('onConfirm', args, 1000).then(() => {
                throw new Error('Forbidden');
              }),
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
