import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ISnackbarProps } from './Snackbar.types';
import { ComponentShowcase } from '~/components/ComponentShowcase';
import { Button } from '~/components/Button';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Snackbar } from './Snackbar';

// https://m3.material.io/components/snackbar

const meta = {
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISnackbarProps>;

const Demo: React.FC<ISnackbarProps> = (props: ISnackbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Snackbar open={open} onClose={() => setOpen(false)} {...props} />
      <Button onClick={() => setOpen((open) => !open)}>Open</Button>
    </>
  );
};

export const Open: IStory = {
  render: (props: ISnackbarProps) => (
    <ComponentShowcase
      component={Demo}
      props={props}
      cols={[
        {
          legend: 'Left',
          props: {
            horizontalOrigin: 'left',
          },
        },
        {
          legend: 'Center',
          props: {
            horizontalOrigin: 'center',
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
            onActionClick: (...args) => sbHandleEvent('click', args, 1000),
          },
        },
        {
          legend: 'Actionable and auto hide',
          props: {
            children: "Couldn't send photo.",
            actionLabel: 'Retry',
            onActionClick: (...args) => sbHandleEvent('click', args, 1000),
            autoHideDuration: 2000,
          },
        },
        {
          legend: 'Actionable and closable',
          props: {
            children: "Couldn't send photo.",
            actionLabel: 'Retry',
            onActionClick: (...args) => sbHandleEvent('click', args, 1000),
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

export default meta;
