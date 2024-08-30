import { isNumeric } from './isNumeric';

export const sizeToString = (size: string | number): string =>
  isNumeric(size) ? `${size}px` : size;
