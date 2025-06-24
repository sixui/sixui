import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IFileDropZoneFileCardProps } from './FileDropZoneFileCard.types';
import {
  componentShowcaseFactory,
  IComponentPresentation,
} from '~/components/ComponentShowcase';
import { IFileDropZoneFileState } from '~/hooks/useFileDropZone';
import { FileDropZoneFileCard } from './FileDropZoneFileCard';

const meta = {
  component: FileDropZoneFileCard,
} satisfies Meta<typeof FileDropZoneFileCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  file: {
    state: IFileDropZoneFileState.Initialized,
    internalId: '0',
    thumbUrl:
      'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200',
    name: 'File.png',
    mimeType: 'image/png',
    size: 133421,
  },
  w: '344px',
} satisfies Partial<IFileDropZoneFileCardProps>;

const rows: Array<IComponentPresentation<IFileDropZoneFileCardProps>> = [
  { legend: 'Basic' },
  {
    legend: 'Deletable',
    props: {
      onDelete: () => {},
    },
  },
];

const FileDropZoneFileCardShowcase =
  componentShowcaseFactory(FileDropZoneFileCard);

export const Basic: IStory = {
  render: (props) => <FileDropZoneFileCardShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export default meta;
