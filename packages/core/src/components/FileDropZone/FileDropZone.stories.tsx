import type { Meta, StoryObj } from '@storybook/react';

import type { IFileDropZoneDemoProps } from './FileDropZone.stories/FileDropZoneDemo';
import { Flex } from '~/components/Flex';
import { SimpleGrid } from '~/components/SimpleGrid';
import { Sortable } from '~/components/Sortable';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { IFileSizeUnit } from '~/utils/types';
import { FileDropZone } from './FileDropZone';
import { FileDropZoneDemo } from './FileDropZone.stories/FileDropZoneDemo';
import { FILES } from './FileDropZone.stories/files';
import { getIconFromMimeType } from './FileDropZone.stories/getIconFromMimeType';

const meta = {
  component: FileDropZoneDemo,
} satisfies Meta<typeof FileDropZoneDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '480px',
  acceptedFileTypes: {
    'image/*': [],
  },
  maxFileSize: 1 * IFileSizeUnit.Megabyte,
  onAccept: (...args) => sbHandleEvent('onAccept', args),
  onReject: (...args) => sbHandleEvent('onReject', args),
  children: ({ files, handleDelete }) => (
    <Flex direction="row" wrap="wrap" content="start" gap="$sm">
      {files.map((file) => (
        <FileDropZone.FileCard
          key={file.key}
          id={file.key}
          file={file}
          icon={file.mimeType ? getIconFromMimeType(file.mimeType) : undefined}
          onDelete={() => handleDelete(file)}
        />
      ))}
    </Flex>
  ),
} satisfies Partial<IFileDropZoneDemoProps>;

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
    initialFiles: FILES.slice(0, 1),
  },
};

export const OneFileLoading: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
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
  render: (props) => <FileDropZoneDemo {...props} />,
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
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 1),
    maxFileCount: 1,
  },
};

export const TwoFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 2),
  },
};

export const FourFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
  },
};

export const TooManyFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    maxFileCount: 3,
  },
};

export const SortableFiles: IStory = {
  render: (props) => <FileDropZoneDemo {...props} />,
  args: {
    ...defaultArgs,
    initialFiles: FILES.slice(0, 4),
    children: ({ files, handleDelete, handleReorder }) => (
      <Sortable
        as={SimpleGrid}
        w="max-content"
        cols={3}
        spacing="$sm"
        value={files.map((file) => file.key)}
        onChange={handleReorder}
        itemRenderer={(item) => {
          const file = files.find((f) => f.key === item.id);
          if (!file) {
            return;
          }

          return (
            <Sortable.Item
              key={file.key}
              as={FileDropZone.FileCard}
              id={file.key}
              file={file}
              icon={
                file.mimeType ? getIconFromMimeType(file.mimeType) : undefined
              }
              onDelete={() => handleDelete(file)}
            />
          );
        }}
      />
    ),
  },
};

export default meta;
