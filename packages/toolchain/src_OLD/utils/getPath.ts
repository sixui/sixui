import path from 'node:path';

export const getPath = (filePath: string): string =>
  path.posix.resolve(filePath);
