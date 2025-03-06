import type { fileDropZoneStrings } from '../FileDropZone.strings';
import type { IFileDropZoneProps } from '../FileDropZone.types';
import { getFormattedFileSize } from '~/utils/getFormattedFileSize';
import { getFormattedImageSizeConstraints } from './getFormattedImageSizeConstraints';

export const getFormattedConstraints = (
  props: Pick<
    IFileDropZoneProps,
    'acceptedFileTypes' | 'acceptedImageSize' | 'maxFileCount' | 'maxFileSize'
  > & {
    strings: typeof fileDropZoneStrings.imageSizeConstraints;
  },
): string => {
  const { maxFileSize, acceptedImageSize, strings } = props;
  const constraints: Array<string> = [];

  if (maxFileSize) {
    constraints.push(`Max: ${getFormattedFileSize(maxFileSize)}`);
  }

  if (acceptedImageSize) {
    constraints.push(
      ...getFormattedImageSizeConstraints(acceptedImageSize, strings),
    );
  }

  return constraints.join(' • ');
};
