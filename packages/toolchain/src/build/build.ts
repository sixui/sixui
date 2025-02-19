import type { OutputOptions } from 'rollup';
import path from 'path';

import { asArray } from '~/utils/asArray';
import { createLogger } from '~/utils/createLogger';
import { getPath } from '~/utils/getPath';
import { loadFirstCompilerOptions } from '~/utils/loadFirstCompilerOptions';
import { compile } from './compile';

const logger = createLogger('build');

export interface IUserBuildOptions {
  tsconfig: string | Array<string>;
  rootDir: string;
  outDir: string;
  entryPoint: string;
  cssOutputBundleName: string;
  outputOptions?: OutputOptions;
  cwd?: string;
}

export interface IBuildOptions extends IUserBuildOptions {
  tsconfig: string;
}

const defaultBuildOptions = {
  tsconfig: ['tsconfig.build.json', 'tsconfig.json'],
  rootDir: 'src',
  entryPoint: 'src/index.ts',
  cssOutputBundleName: 'styles.css',
};

export const build = async (
  userBuildOptions?: Partial<IUserBuildOptions>,
): Promise<void> => {
  const tsconfigs = asArray(
    userBuildOptions?.tsconfig ?? defaultBuildOptions.tsconfig,
  ).map((tsconfig) => getPath(tsconfig, userBuildOptions?.cwd));
  const firstCompilerOptions = await loadFirstCompilerOptions(tsconfigs);

  const cwd =
    userBuildOptions?.cwd ??
    path.resolve(path.dirname(firstCompilerOptions.path));

  const outDir = firstCompilerOptions.data.outDir;
  if (!outDir) {
    throw new Error(
      `You must set \`compilerOptions.outDir\` in \`${firstCompilerOptions.path}\`.`,
    );
  }

  const buildOptions: IBuildOptions = {
    ...defaultBuildOptions,
    ...userBuildOptions,
    cwd,
    outDir,
    tsconfig: path.relative(cwd, firstCompilerOptions.path),
  };

  logger.note('Build options:', buildOptions);

  await compile(buildOptions, firstCompilerOptions.data);

  logger.success('Done.');
};
