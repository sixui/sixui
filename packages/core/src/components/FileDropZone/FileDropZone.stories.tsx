import type { Meta, StoryObj } from '@storybook/react';

import type { IFileDropZoneProps } from './FileDropZone.types';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZone } from './FileDropZone';
import { FILES } from './FileDropZone.stories/files';
import { getIconFromMimeType } from './FileDropZone.stories/getIconFromMimeType';

const meta = {
  component: FileDropZone,
} satisfies Meta<typeof FileDropZone>;

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
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<IFileDropZoneProps>;

export const Empty: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: defaultArgs,
};

export const ThrowErrorOnDrop: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    onAccept: () => {
      throw new Error('Error on drop.');
    },
  },
};

export const ImageSizeConstraint: IStory = {
  render: (props) => <FileDropZone {...props} />,
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
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const OneFile: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
  },
};

export const OneFileLoading: IStory = {
  render: (props) => <FileDropZone {...props} />,
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
  render: (props) => <FileDropZone {...props} />,
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
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
    maxFileCount: 1,
  },
};

export const TwoFiles: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 2),
  },
};

export const FourFiles: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
  },
};

export const TooManyFiles: IStory = {
  render: (props) => <FileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    maxFileCount: 3,
  },
};

const SortableFileDropZone: React.FC<IFileDropZoneProps> = (props) => {
  return <FileDropZone {...props}></FileDropZone>;
};

export const SortableFiles: IStory = {
  render: (props) => <SortableFileDropZone {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    sortable: true,
  },
};

export default meta;
