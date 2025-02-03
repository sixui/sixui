import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
// DEV: delete
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import type { ISnackbarProps } from './Snackbar.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Snackbar } from './Snackbar';

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
        w="$24"
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

const MySnackbar = NiceModal.create((props: ISnackbarProps) => {
  const modal = useModal();

  return (
    <Snackbar
      {...props}
      opened={modal.visible}
      onClose={() => {
        modal.resolve();
        return modal.hide();
      }}
      onAfterClose={() => {
        modal.remove();
      }}
    />
  );
});

// DEV:
const TestDemo: React.FC<ISnackbarProps> = (props: ISnackbarProps) => (
  <NiceModal.Provider>
    <Button
      onClick={() =>
        NiceModal.show(MySnackbar, {
          ...props,
          children: 'AAA',
        })
      }
    >
      Show A
    </Button>
    <Button
      onClick={() =>
        NiceModal.show(MySnackbar, {
          ...props,
          children: 'BBB',
        })
      }
    >
      Show B
    </Button>
  </NiceModal.Provider>
);

// DEV:
export const Test: IStory = {
  render: (props: ISnackbarProps) => <TestDemo {...props} />,
  args: {
    ...defaultArgs,
    children: 'Lorem ipsum dolor sit amet.',
    showCloseButton: true,
  },
};

export default meta;
