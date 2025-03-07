import type { Meta, StoryObj } from '@storybook/react';

import type { IFileDropZoneFileCardProps } from './FileDropZoneFileCard.types';
import { FileDropZoneFileCard } from './FileDropZoneFileCard';

const meta = {
  component: FileDropZoneFileCard,
} satisfies Meta<typeof FileDropZoneFileCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  file: {
    key: '0',
    thumbUrl:
      'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200',
    name: 'File.png',
    mimeType: 'image/png',
    size: 133421,
  },
} satisfies Partial<IFileDropZoneFileCardProps>;

export const Basic: IStory = {
  render: (props) => <FileDropZoneFileCard {...props} />,
  args: defaultArgs,
};

export const NoMetadata: IStory = {
  render: (props) => <FileDropZoneFileCard {...props} />,
  args: {
    ...defaultArgs,
    hideMetadata: true,
  },
};

export default meta;
