import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
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

const rows: Array<IComponentPresentation<ISnackbarProps>> = [
  { legend: 'Text' },
  {
    legend: 'Actionable',
    props: {
      actionLabel: 'Action',
      onActionClick: (...args) => sbHandleEvent('click', args, 1000),
    },
  },
  {
    legend: 'Closable',
    props: {
      onClose: (...args) => sbHandleEvent('click', args, 1000),
    },
  },
  {
    legend: 'Actionable and closable',
    props: {
      actionLabel: 'Action',
      onActionClick: (...args) => sbHandleEvent('click', args, 1000),
      onClose: (...args) => sbHandleEvent('click', args, 1000),
    },
  },
  {
    legend: 'Longer action',
    props: {
      actionLabel: 'Action with a longer label',
      onActionClick: (...args) => sbHandleEvent('click', args, 1000),
      long: true,
    },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase component={Snackbar} props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    children: 'Lorem ipsum dolor sit amet',
  },
};

export default meta;
