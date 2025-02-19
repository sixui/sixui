import path from 'node:path';

export const getPath = (pathToResolve: string, rootPath?: string): string => {
  const fullPath = pathToResolve.startsWith('/')
    ? pathToResolve
    : rootPath
      ? path.join(rootPath, pathToResolve)
      : pathToResolve;

  return fullPath;
};
