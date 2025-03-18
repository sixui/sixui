import type { IFileDropZoneInputFile } from '~/hooks/useFileDropZone';
import { IFileDropZoneFileState } from '~/hooks/useFileDropZone';
import { MIME_TYPES } from '../../mimeTypes.constants';

export const FILES: Record<string, IFileDropZoneInputFile> = {
  id0: {
    id: 'id0',
    state: IFileDropZoneFileState.Initialized,
    thumbUrl:
      'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&w=200',
    name: 'File.png',
    mimeType: MIME_TYPES.png,
    size: 133421,
  },
  id1: {
    id: 'id1',
    state: IFileDropZoneFileState.Initialized,
    thumbUrl:
      'https://images.unsplash.com/photo-1455659817273-f96807779a8a?q=80&w=200',
    name: 'File_with_a_long_name.jpg',
    mimeType: MIME_TYPES.jpeg,
    size: 234234,
  },
  id2: {
    id: 'id2',
    state: IFileDropZoneFileState.Initialized,
    thumbUrl:
      'https://images.unsplash.com/photo-1579645899072-e14c6b840afa?q=80&w=200',
    name: 'File with a very, very, very, very, extremely, insanely huge long name.mp4',
    mimeType: MIME_TYPES.mp4,
    size: 243244,
  },
  id3: {
    id: 'id3',
    state: IFileDropZoneFileState.Initialized,
    name: 'File with no image.pdf',
    mimeType: MIME_TYPES.pdf,
    size: 8329644,
  },
};
