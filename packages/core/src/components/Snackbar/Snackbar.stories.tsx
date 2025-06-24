import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { ISnackbarProps } from './Snackbar.types';
import type { ISnackbarOverlayProps } from './SnackbarOverlay';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Snackbar } from './Snackbar';
import { SnackbarOverlay } from './SnackbarOverlay';

const meta = {
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onActionClick: (...args) => sbHandleEvent('onActionClick', args, 1000),
} satisfies Partial<ISnackbarProps>;

const SnackbarDemo: React.FC<ISnackbarProps> = (props: ISnackbarProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Snackbar
        opened={opened}
        {...props}
        onClose={(...args) =>
          sbHandleEvent('onClose', args, 1000).then(() => {
            setOpened(false);
          })
        }
      />
      <Button
        onClick={() => {
          setOpened((opened) => !opened);
        }}
        w="96px"
      >
        {opened ? 'Close' : 'Open'}
      </Button>
    </>
  );
};

const SnackbarDemoShowcase = componentShowcaseFactory(SnackbarDemo);

export const Open: IStory = {
  render: (props: ISnackbarProps) => (
    <SnackbarDemoShowcase
      props={props}
      cols={[
        {
          legend: 'Start',
          props: {
            justify: 'start',
          },
        },
        {
          legend: 'Center',
          props: {
            justify: 'center',
          },
        },
      ]}
      rows={[
        {
          legend: 'Auto hide',
          props: {
            children: 'Photo has been saved to your album.',
            autoHideDuration: 2000,
          },
        },
        {
          legend: 'Actionable',
          props: {
            children: "Couldn't send photo.",
            actionLabel: 'Retry',
          },
        },
        {
          legend: 'Actionable and auto hide',
          props: {
            children: "Couldn't send photo.",
            actionLabel: 'Retry',
            autoHideDuration: 2000,
          },
        },
        {
          legend: 'Actionable and closable',
          props: {
            children: "Couldn't send photo.",
            actionLabel: 'Retry',
            showCloseButton: true,
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'Lorem ipsum dolor sit amet.',
  },
};

const AsOverlayDemo: React.FC<ISnackbarOverlayProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Flex direction="row" gap="$md">
      <Button onClick={() => void overlays.open(SnackbarOverlay, props)}>
        Open
      </Button>
      <Button
        onClick={() => {
          overlays.closeAll({ layer: 'snackbars' });
        }}
      >
        Close all
      </Button>
    </Flex>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props) => (
    <AsOverlayDemoShowcase
      props={props}
      rows={[
        { legend: 'Normal' },
        {
          legend: 'Closable',
          props: {
            showCloseButton: true,
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'Saved!',
  },
};

export default meta;
