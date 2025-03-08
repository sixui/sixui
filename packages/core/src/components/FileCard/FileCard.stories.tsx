import type { Meta, StoryObj } from '@storybook/react';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFileCardProps } from './FileCard.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IconButton } from '~/components/IconButton';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { FileCard } from './FileCard';

const meta = {
  component: FileCard,
} satisfies Meta<typeof FileCard>;

type IStory = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200';
const TRANSPARENT_IMAGE_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0OCIgaGVpZ2h0PSIyMDQ4IiB2aWV3Qm94PSIwIDAgMjA0OCAyMDQ4IiBmaWxsPSJub25lIgogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzRfMjgpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MTIsNTEyKSI+CiAgICA8cGF0aCBkPSJNNTEyLjQgOTQ3LjZDNDU4LjggOTQ3LjYgNDA5LjggOTM0LjQgMzY1LjQgOTA4QzMyMSA4ODEuMiAyODUuNCA4NDUuNiAyNTguNiA4MDEuMkMyMzIuMiA3NTYuNCAyMTkgNzA3IDIxOSA2NTNDMjE5IDYyNC4yIDIyMi40IDU5OC4yIDIyOS4yIDU3NUMyMzYgNTUxLjggMjQ2LjQgNTI3LjQgMjYwLjQgNTAxLjhMNDk2LjggOTEuOTk5OUg2NDJMNDc4LjIgMzc1LjJDNTExLjQgMzY4LjggNTQzLjggMzY4LjYgNTc1LjQgMzc0LjZDNjA3LjQgMzgwLjIgNjM3LjQgMzkxLjIgNjY1LjQgNDA3LjZDNjkzLjQgNDIzLjYgNzE4IDQ0NCA3MzkuMiA0NjguOEM3NjAuOCA0OTMuMiA3NzcuNiA1MjEgNzg5LjYgNTUyLjJDODAxLjYgNTgzLjQgODA3LjYgNjE3IDgwNy42IDY1M0M4MDcuNiA2OTMuNCA3OTkuOCA3MzEuNCA3ODQuMiA3NjdDNzY5IDgwMi42IDc0Ny44IDgzNCA3MjAuNiA4NjEuMkM2OTMuOCA4ODggNjYyLjQgOTA5LjIgNjI2LjQgOTI0LjhDNTkwLjggOTQwIDU1Mi44IDk0Ny42IDUxMi40IDk0Ny42Wk01MTIuNCA4MjIuOEM1NDUuMiA4MjIuOCA1NzQuNCA4MTQuOCA2MDAgNzk4LjhDNjI1LjYgNzgyLjggNjQ1LjggNzYxLjggNjYwLjYgNzM1LjhDNjc1LjQgNzA5LjggNjgyLjggNjgyLjIgNjgyLjggNjUzQzY4Mi44IDYyMi4yIDY3NS4yIDU5NCA2NjAgNTY4LjRDNjQ1LjIgNTQyLjggNjI1IDUyMi40IDU5OS40IDUwNy4yQzU3My44IDQ5MS42IDU0NS4yIDQ4My44IDUxMy42IDQ4My44QzQ4MC44IDQ4My44IDQ1MS42IDQ5MS44IDQyNiA1MDcuOEM0MDAuNCA1MjMuOCAzODAuMiA1NDQuNiAzNjUuNCA1NzAuMkMzNTEgNTk1LjggMzQzLjggNjIzLjQgMzQzLjggNjUzQzM0My44IDY4NS40IDM1MS42IDcxNC40IDM2Ny4yIDc0MEMzODMuMiA3NjUuNiA0MDQgNzg1LjggNDI5LjYgODAwLjZDNDU1LjIgODE1LjQgNDgyLjggODIyLjggNTEyLjQgODIyLjhaIiBmaWxsPSIjQ0ZCQ0ZGIi8+CiAgICA8Y2lyY2xlIGN4PSI1MTMiIGN5PSI2NTMiIHI9IjEzMyIgc3Ryb2tlPSIjQ0ZCQ0ZGIiBzdHJva2Utd2lkdGg9IjIwIi8+CiAgICA8cmVjdCB4PSI0MjYuODg1IiB5PSI1NjYuODg1IiB3aWR0aD0iMTcyLjIzIiBoZWlnaHQ9IjE3Mi4yMyIgc3Ryb2tlPSIjQ0ZCQ0ZGIiBzdHJva2Utd2lkdGg9IjIwIi8+CiAgICA8cGF0aCBkPSJNNTkxLjU0NiA1NjguMjczTDUxMyA3MjUuMzY2TDQzNC40NTQgNTY4LjI3M0w1OTEuNTQ2IDU2OC4yNzNaIiBzdHJva2U9IiNDRkJDRkYiIHN0cm9rZS13aWR0aD0iMjAiLz4KICA8L2c+Cjwvc3ZnPgo=';

const defaultArgs = {
  fileName: 'flowers.jpg',
  fileSize: 133421,
  onClick: (...args) => sbHandleEvent('click', args),
  w: '320px',
} satisfies Partial<IFileCardProps>;

const states: Array<IComponentPresentation<IFileCardProps>> = [
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
  },
  {
    legend: 'Loading with progress',
    props: {
      loading: true,
      progress: 0.67,
    },
  },
  {
    legend: 'Loaded',
  },
  {
    legend: 'Supporting text',
    props: {
      supportingText: 'Processing...',
    },
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
      errorText: 'The file is too large.',
    },
  },
  {
    legend: 'Deletable and extra action',
    props: {
      errorText: 'Network failed.',
      onDelete: (...args) => sbHandleEvent('delete', args, 1000),
      extraActions: ({ disabled }) => (
        <IconButton
          icon={<FontAwesomeIcon icon={faDownload} />}
          onClick={(...args) => sbHandleEvent('download', args, 1000)}
          disabled={disabled}
        />
      ),
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const cols: Array<IComponentPresentation<IFileCardProps>> = [
  {
    legend: 'With icon',
    props: {
      icon: <FontAwesomeIcon icon={faFilePdf} />,
    },
  },
  {
    legend: 'With image',
    props: {
      thumbUrl: IMAGE_URL,
    },
  },
  {
    legend: 'With transparent image',
    props: {
      thumbUrl: TRANSPARENT_IMAGE_URL,
    },
  },
];

const FileCardShowcase = componentShowcaseFactory(FileCard);

export const States: IStory = {
  render: (props) => (
    <FileCardShowcase props={props} rows={states} cols={cols} />
  ),
  args: defaultArgs,
};

export default meta;
