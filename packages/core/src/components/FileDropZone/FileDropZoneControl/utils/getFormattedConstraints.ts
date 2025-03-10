import type { fileDropZoneControlStrings } from '../FileDropZoneControl.strings';
import type { IFileDropZoneControlProps } from '../FileDropZoneControl.types';
import { getFormattedFileSize } from '~/utils/getFormattedFileSize';
import { getFormattedImageSizeConstraints } from './getFormattedImageSizeConstraints';

export const getFormattedConstraints = (
  props: Pick<
    IFileDropZoneControlProps,
    'acceptedFileTypes' | 'acceptedImageSize' | 'maxFileCount' | 'maxFileSize'
  > & {
    strings: typeof fileDropZoneControlStrings.imageSizeConstraints;
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
