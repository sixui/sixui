import type { OutputOptions } from 'rollup';
import type { CompilerOptions } from 'typescript';
import { rollup } from 'rollup';

import type { IBuildOptions } from './build';
import { createLogger } from '~/utils/createLogger';
import { createRollupOptionsList } from './rollup/createRollupOptionsList';

const logger = createLogger('compile');

export const compile = async (
  buildOptions: IBuildOptions,
  compilerOptions: CompilerOptions,
): Promise<void> => {
  const rollupOptionsList = createRollupOptionsList(
    buildOptions,
    compilerOptions,
  );

  for (const rollupOptions of rollupOptionsList) {
    logger.note('Compile:', rollupOptions.output);

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
