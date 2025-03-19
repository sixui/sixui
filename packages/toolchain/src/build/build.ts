import type { OutputOptions } from 'rollup';
import path from 'path';

import { asArray } from '~/utils/asArray';
import { createLogger } from '~/utils/createLogger';
import { getPath } from '~/utils/getPath';
import { loadFirstCompilerOptions } from '~/utils/loadFirstCompilerOptions';
import { compile } from './compile';

const logger = createLogger('build');

export interface IBuildOptions {
  tsconfig: string;
  cwd?: string;
  rootDir: string;
  entryPoint: string;
  outputDirPath: string;
  outputCssBundle: boolean;
  outputCssBundleName: string;
  outputOptions?: OutputOptions;
}

export type IUserBuildOptions = Partial<
  IBuildOptions & {
    tsconfig?: string | Array<string>;
  }
>;

const defaultUserBuildOptions = {
  tsconfig: ['tsconfig.build.json', 'tsconfig.json'],
  rootDir: 'src',
  entryPoint: 'src/index.ts',
  outputDirPath: 'dist',
  outputCssBundle: true,
  outputCssBundleName: 'styles.css',
};

export const build = async (
  userBuildOptions?: IUserBuildOptions,
): Promise<void> => {
  const tsconfigs = asArray(
    userBuildOptions?.tsconfig ?? defaultUserBuildOptions.tsconfig,
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
    ...defaultUserBuildOptions,
    ...userBuildOptions,
    ...{
      cwd,
      tsconfig: path.relative(cwd, firstCompilerOptions.path),
      outputDirPath: outDir,
    },
  };

  logger.note('Build options:', buildOptions);

  await compile(buildOptions, firstCompilerOptions.data);

  logger.success('Done.');
};
