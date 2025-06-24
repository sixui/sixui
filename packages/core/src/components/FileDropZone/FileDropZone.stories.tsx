import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFileDropZoneProps } from './FileDropZone.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZone } from './FileDropZone';

const meta = {
  component: FileDropZone,
  args: {
    w: '344px',
    label: 'Attached images',
    supportingText: 'Images will not be uploaded.',
    acceptedFileTypes: {
      'image/*': [],
    },
    maxFileSize: 1 * IFileSizeUnit.Megabyte,
    required: true,
    onChange: (...args) => void sbHandleEvent('onChange', args),
  },
} satisfies Meta<typeof FileDropZone>;

type IStory = StoryObj<typeof meta>;

const cols: Array<IComponentPresentation<IFileDropZoneProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
      errorText: 'An error occurred.',
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const FileDropZoneShowcase = componentShowcaseFactory(FileDropZone);

export const Basic: IStory = {
  render: (props) => (
    <FileDropZoneShowcase props={props} cols={cols} verticalAlign="start" />
  ),
};

export const Scales: IStory = {
  render: (props) => (
    <FileDropZoneShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
};

export const Densities: IStory = {
  render: (props) => (
    <FileDropZoneShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
};

export default meta;
