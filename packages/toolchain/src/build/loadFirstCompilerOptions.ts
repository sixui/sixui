import type { CompilerOptions } from 'typescript';

import { getFirstExistingFile } from '../utils/getFirstExistingFile';
import { loadCompilerOptions } from './loadCompilerOptions';

export const loadFirstCompilerOptions = async (
  tsconfigFilePaths: Array<string>,
): Promise<{ path: string; data: CompilerOptions }> => {
  if (!tsconfigFilePaths.length) {
    throw new Error('You must provide at least one tsconfig file.');
  }

  const path = await getFirstExistingFile(tsconfigFilePaths);
  if (!path) {
    throw new Error(
      `No tsconfig found. Tried: ${tsconfigFilePaths.map((tsconfigFilePath) => `\`${tsconfigFilePath}\``).join(', ')}`,
    );
  }

  const compilerOptions = loadCompilerOptions(path);

  return {
    path,
    data: compilerOptions,
  };
};
