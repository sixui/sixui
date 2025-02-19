import fs from 'fs-extra';

export interface IPackageJson {
  name: string;
  version: string;
}

export const loadPackageJson = async (
  packageJsonpath: string,
): Promise<IPackageJson> => {
  const packageJson = (await fs.readJson(packageJsonpath, {
    encoding: 'utf-8',
  })) as IPackageJson;

  return packageJson;
};
