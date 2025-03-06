import type { Meta, StoryObj } from '@storybook/react';
import { faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IFileDropZoneFileCardsProps } from './FileDropZoneFileCards.types';
import { FileDropZoneFileCards } from './FileDropZoneFileCards';

const meta = {
  component: FileDropZoneFileCards,
} satisfies Meta<typeof FileDropZoneFileCards>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  files: [
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
  ],
  fileIconRenderer: (mimeType) => {
    switch (mimeType) {
      case 'application/pdf':
        return <FontAwesomeIcon icon={faFilePdf} />;

      default:
        return <FontAwesomeIcon icon={faFile} />;
    }
  },
} satisfies Partial<IFileDropZoneFileCardsProps>;

export const Basic: IStory = {
  render: (props) => <FileDropZoneFileCards {...props} />,
  args: defaultArgs,
};

export const NoMetadata: IStory = {
  render: (props) => <FileDropZoneFileCards {...props} />,
  args: {
    ...defaultArgs,
    hideMetadata: true,
  },
};

export default meta;
