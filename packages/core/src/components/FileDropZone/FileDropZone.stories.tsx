import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFileDropZoneProps } from './FileDropZone.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZone } from './FileDropZone';
import { FILES } from './FileDropZone.stories/files';

const meta = {
  component: FileDropZone,
} satisfies Meta<typeof FileDropZone>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '344px',
  label: 'Attached images',
  supportingText: 'Images will not be uploaded.',
  acceptedFileTypes: {
    'image/*': [],
  },
  maxFileSize: 1 * IFileSizeUnit.Megabyte,
  required: true,
  initialFiles: FILES.slice(0, 1),
} satisfies Partial<IFileDropZoneProps>;

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
  args: defaultArgs,
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
  args: defaultArgs,
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
  args: defaultArgs,
};

export default meta;
