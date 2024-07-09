import type { Meta, StoryObj } from '@storybook/react';

import type { ISnackbarContentProps } from './SnackbarContentProps';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { SnackbarContent } from './SnackbarContent';

// https://m3.material.io/components/snackbar

const meta = {
  component: SnackbarContent,
} satisfies Meta<typeof SnackbarContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISnackbarContentProps>;

const rows: Array<IComponentPresentation<ISnackbarContentProps>> = [
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
      showCloseButton: true,
    },
  },
  {
    legend: 'Actionable and closable',
    props: {
      actionLabel: 'Action',
      onActionClick: (...args) => sbHandleEvent('click', args, 1000),
      onClose: (...args) => sbHandleEvent('click', args, 1000),
      showCloseButton: true,
    },
  },
  {
    legend: 'Longer text',
    props: {
      actionLabel: 'Action',
      onActionClick: (...args) => sbHandleEvent('click', args, 1000),
    },
  },
];

export const Short: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SnackbarContent}
      props={props}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const Long: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={SnackbarContent}
      props={props}
      rows={rows}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.',
  },
};

export default meta;
