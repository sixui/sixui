import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type {
  IFileDropZoneFileInfo,
  IFileDropZonePartialFileInfo,
  IFileDropZoneProps,
} from './FileDropZone.types';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZone } from './FileDropZone';

const INITIAL_FILES_INFO: Array<IFileDropZoneFileInfo> = [
  {
    key: '0',
    thumbUrl:
      'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200',
    name: 'File.png',
    mimeType: 'image/png',
    size: 133421,
  },
  {
    key: '1',
    thumbUrl:
      'https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=200',
    name: 'File_with_a_long_name.jpg',
    mimeType: 'image/jpeg',
    size: 234234,
  },
  {
    key: '2',
    thumbUrl:
      'https://images.unsplash.com/photo-1579645899072-e14c6b840afa?q=80&w=200',
    name: 'File with a very, extremely, insanely long name.mp4',
    mimeType: 'video/mp4',
    size: 243244,
  },
  {
    key: '3',
    name: 'File with no image.pdf',
    mimeType: 'application/pdf',
    size: 8329644,
  },
];

const meta = {
  component: FileDropZone,
} satisfies Meta<typeof FileDropZone>;

type IStory = StoryObj<typeof meta>;

const FileDropZoneDemo: React.FC<IFileDropZoneProps> = (props) => {
  const [files, setFiles] = useState<Array<IFileDropZonePartialFileInfo>>(
    props.files ?? [],
  );

  const handleAccept = (fileInfo: IFileDropZoneFileInfo): void => {
    void Promise.resolve(props.onAccept?.(fileInfo)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          key: fileInfo.key,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
        },
      ]);
    });
  };

  const handleReject = (fileInfo: IFileDropZoneFileInfo): void => {
    void Promise.resolve(props.onReject?.(fileInfo)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          key: fileInfo.key,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
          errorTextList: fileInfo.errorTextList,
        },
      ]);
    });
  };

  const handleDelete = (fileInfo: IFileDropZonePartialFileInfo): void => {
    void Promise.resolve(props.onDelete?.(fileInfo)).then(() => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.key !== fileInfo.key),
      );
    });
  };

  return (
    <FileDropZone
      {...props}
      onAccept={handleAccept}
      onReject={handleReject}
      onDelete={handleDelete}
      files={files}
      acceptedFileTypes={{
        ...props.acceptedFileTypes,
        'image/*': [],
      }}
    />
  );
};

const defaultArgs = {
  w: '480px',
  maxFileSize: 1 * IFileSizeUnit.Megabyte,
  onAccept: (...args) => sbHandleEvent('onAccept', args),
  onReject: (...args) => sbHandleEvent('onReject', args),
  onDelete: (...args) => sbHandleEvent('onDelete', args),
  renderFileIcon: (mimeType) => {
    switch (mimeType) {
      case 'application/pdf':
        return <FontAwesomeIcon icon={faFilePdf} />;

      default:
        return <FontAwesomeIcon icon={faFile} />;
    }
  },
} satisfies Partial<IFileDropZoneProps>;

export const Empty: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: defaultArgs,
};

export const ThrowErrorOnDrop: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    onAccept: () => {
      throw new Error('Error on drop.');
    },
  },
};

export const ImageSizeConstraint: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
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
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const OneFile: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 1),
  },
};

export const OneFileNoMetadata: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 1),
    hideMetadata: true,
  },
};

export const OneFileLoading: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: [
      {
        ...INITIAL_FILES_INFO[0],
        loading: true,
      },
    ],
  },
};

export const OneFileWithProgress: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: [
      {
        ...INITIAL_FILES_INFO[0],
        loading: true,
        progress: 0.33,
      },
    ],
  },
};

export const OneFileMax: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 1),
    maxFileCount: 1,
  },
};

export const TwoFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 2),
  },
};

export const FourFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 4),
  },
};

export const TooManyFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    files: INITIAL_FILES_INFO.slice(0, 4),
    maxFileCount: 3,
  },
};

export default meta;
