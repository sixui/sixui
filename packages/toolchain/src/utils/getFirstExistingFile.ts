import { pathExists } from 'fs-extra';

export const getFirstExistingFile = async (
  paths: Array<string>,
): Promise<string | null> => {
  for (const path of paths) {
    if (await pathExists(path)) {
      return path;
    }
  }

  return null;
};
