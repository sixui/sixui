import type { OutputOptions } from 'rollup';
import type { CompilerOptions } from 'typescript';
import { rollup } from 'rollup';

import type { IBuildOptions } from './build';
import { createRollupOptionsList } from './rollup/createRollupOptionsList';

export const compile = async (
  buildOptions: IBuildOptions,
  compilerOptions: CompilerOptions,
): Promise<void> => {
  const rollupOptionsList = createRollupOptionsList(
    buildOptions,
    compilerOptions,
  );

  for (const rollupOptions of rollupOptionsList) {
    const build = await rollup(rollupOptions);

    const outputOptionsList: Array<OutputOptions> = Array.isArray(
      rollupOptions.output,
    )
      ? rollupOptions.output
      : [rollupOptions.output!];

    await Promise.all(
      outputOptionsList.map((outputOptions) => build.write(outputOptions)),
    );
  }
};
