import type { IFileDropZoneFileInfo } from '../FileDropZone.types';

export const FILES: Array<IFileDropZoneFileInfo> = [
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
