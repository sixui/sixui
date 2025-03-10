import type { IImageSizeConstraints } from './validateImageSize';
import { isObject } from '~/utils/isObject';
import { fileDropZoneControlStrings } from '../FileDropZoneControl.strings';

export const getFormattedImageSizeConstraints = (
  imageSizeConstraint: IImageSizeConstraints,
  strings: typeof fileDropZoneControlStrings.imageSizeConstraints,
): Array<string> => {
  const { width, height } = imageSizeConstraint;

  if (typeof width === 'number' && typeof height === 'number') {
    return [`${strings.size}${width}x${height}${strings.unit}`];
  }

  if (isObject(width) && isObject(height)) {
    if (width.min && !width.max && height.min && !height.max) {
      return [`${strings.min}${width.min}x${height.min}${strings.unit}`];
    }

    if (!width.min && width.max && !height.min && height.max) {
      return [`${strings.max}${width.max}x${height.max}${strings.unit}`];
    }
  }

  const constraints: Array<string> = [];

  if (isObject(width)) {
    if (width.min && width.max) {
      constraints.push(
        `${strings.width}: ${width.min}-${width.max}${strings.unit}`,
      );
    } else if (width.min) {
      constraints.push(`${strings.minWidth}${width.min}${strings.unit}`);
    } else if (width.max) {
      constraints.push(`${strings.maxWidth}${width.max}${strings.unit}`);
    }
  }

  if (isObject(height)) {
    if (height.min && height.max) {
      constraints.push(
        `${strings.height}${height.min}-${height.max}${strings.unit}`,
      );
    } else if (height.min) {
      constraints.push(`${strings.minHeight}${height.min}${strings.unit}`);
    } else if (height.max) {
      constraints.push(`${strings.maxHeight}${height.max}${strings.unit}`);
    }
  }

  return constraints;
};
