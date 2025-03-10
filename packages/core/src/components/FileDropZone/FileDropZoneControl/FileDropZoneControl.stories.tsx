import type { Meta, StoryObj } from '@storybook/react';

import type { IFileDropZoneControlProps } from './FileDropZoneControl.types';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FILES } from '../FileDropZone.stories/files';
import { FileDropZoneControl } from './FileDropZoneControl';
import { getIconFromMimeType } from './FileDropZoneControl.stories/getIconFromMimeType';

const meta = {
  component: FileDropZoneControl,
} satisfies Meta<typeof FileDropZoneControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '344px',
  acceptedFileTypes: {
    'image/*': [],
  },
  getIconFromMimeType,
  maxFileSize: 1 * IFileSizeUnit.Megabyte,
  onAccept: (...args) => sbHandleEvent('onAccept', args),
  onReject: (...args) => sbHandleEvent('onReject', args),
  onDelete: (...args) => sbHandleEvent('onDelete', args),
  onReorder: (...args) => sbHandleEvent('onReorder', args),
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IFileDropZoneControlProps>;

export const Empty: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: defaultArgs,
};

export const ThrowErrorOnDrop: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    onAccept: () => {
      throw new Error('Error on drop.');
    },
  },
};

export const ImageSizeConstraint: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    acceptedImageSize: {
      width: {
        min: 512,
      },
      height: {
        min: 512,
      },
    },
  },
};

export const Disabled: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
    disabled: true,
  },
};

export const OneFile: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
  },
};

export const OneFileLoading: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: [
      {
        ...FILES[0]!,
        loading: true,
      },
    ],
  },
};

export const OneFileWithProgress: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: [
      {
        ...FILES[0]!,
        loading: true,
        progress: 0.33,
      },
    ],
  },
};

export const OneFileMax: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
    maxFileCount: 1,
  },
};

export const TwoFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 2),
  },
};

export const FourFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
  },
};

export const TooManyFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    maxFileCount: 3,
  },
};

const SortableFileDropZoneControl: React.FC<IFileDropZoneControlProps> = (
  props,
) => {
  return <FileDropZoneControl {...props}></FileDropZoneControl>;
};

export const SortableFiles: IStory = {
  render: (props) => <SortableFileDropZoneControl {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    sortable: true,
  },
};

export default meta;
