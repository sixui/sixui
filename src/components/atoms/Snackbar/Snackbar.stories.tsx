import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Button } from '@/components/atoms/Button';
import { Snackbar, type ISnackbarProps } from './Snackbar';

// https://m3.material.io/components/snackbar

const meta = {
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  snackbar: {
    width: 350,
  },
});

const defaultArgs = {
  sx: styles.snackbar,
} satisfies Partial<ISnackbarProps>;

const OpenButton: React.FC = (props: Omit<ISnackbarProps, 'open'>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Snackbar {...props} open={open} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};

export const Open: IStory = {
  render: (props: ISnackbarProps) => (
    <ComponentShowcase
      component={OpenButton}
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
        {
          legend: 'Right',
          props: {
            horizontalOrigin: 'right',
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
