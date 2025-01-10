import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ISnackbarContentProps } from './SnackbarContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { SnackbarContent } from './SnackbarContent';

const meta = {
  component: SnackbarContent,
} satisfies Meta<typeof SnackbarContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISnackbarContentProps>;

const SnackbarContentShowcase = componentShowcaseFactory(SnackbarContent);

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
    <SnackbarContentShowcase
      props={props}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const Long: IStory = {
  render: (props) => (
    <SnackbarContentShowcase
      props={props}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.',
  },
};

export default meta;
