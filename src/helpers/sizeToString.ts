export const sizeToString = (size: string | number): string =>
  typeof size === 'number' ? `${size}px` : size;
