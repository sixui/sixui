import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IFileDropZoneControlProps } from './FileDropZoneControl.types';
import { IFileDropZoneFileState } from '~/hooks/useFileDropZone';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZoneControl } from './FileDropZoneControl';
import { FILES } from './FileDropZoneControl.stories/files';
import { getIconFromMimeType } from './FileDropZoneControl.stories/getIconFromMimeType';

const meta = {
  component: FileDropZoneControl,
  args: {
    w: '344px',
    acceptedFileTypes: {
      'image/*': [],
    },
    getIconFromMimeType,
    maxFileSize: 1 * IFileSizeUnit.Megabyte,
    onAccept: (file, updateFile) => {
      void sbHandleEvent('onAccept', [file]);

      updateFile({
        id: 'fileId',
      });
    },
    onReject: (...args) => void sbHandleEvent('onReject', args),
    onDelete: (...args) => void sbHandleEvent('onDelete', args),
    onReorder: (...args) => void sbHandleEvent('onReorder', args),
    onChange: (...args) => void sbHandleEvent('onChange', args),
  },
} satisfies Meta<typeof FileDropZoneControl>;

type IStory = StoryObj<typeof meta>;

export const Empty: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
};

export const ThrowErrorOnDrop: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    onAccept: () => {
      throw new Error('Error on drop.');
    },
  },
};

export const ImageSizeConstraint: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
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
    defaultValue: Object.values(FILES).slice(0, 1),
    disabled: true,
  },
};

export const OneFile: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: Object.values(FILES).slice(0, 1),
  },
};

export const OneFileInitializing: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: [{ id: 'fileId' }],
  },
};

export const OneFileLoading: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: [
      {
        ...Object.values(FILES)[0]!,
        state: IFileDropZoneFileState.Uploading,
      },
    ],
  },
};

export const OneFileWithProgress: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: [
      {
        ...Object.values(FILES)[0]!,
        state: IFileDropZoneFileState.Uploading,
        progress: 0.33,
      },
    ],
  },
};

export const OneFileMax: IStory = {
  render: (props) => <FileDropZoneControl {...props} required />,
  args: {
    defaultValue: Object.values(FILES).slice(0, 1),
    maxFileCount: 1,
  },
};

export const TwoFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: Object.values(FILES).slice(0, 2),
  },
};

export const FourFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: Object.values(FILES).slice(0, 4),
  },
};

export const TooManyFiles: IStory = {
  render: (props) => <FileDropZoneControl {...props} />,
  args: {
    defaultValue: Object.values(FILES).slice(0, 4),
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
    defaultValue: Object.values(FILES).slice(0, 4),
    sortable: true,
  },
};

export default meta;
