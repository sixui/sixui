import path from 'node:path';
import { pathExists } from 'fs-extra';

import { getPath } from './getPath';

export async function locatePackage(
  packageName: string,
): Promise<string | null> {
  const packagePath = path.join(getPath('packages'), packageName);
  const exists = await pathExists(packagePath);

  return exists ? packagePath : null;
}
