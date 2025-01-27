import type { OutputOptions, RollupOptions, RollupOutput } from 'rollup';
import path from 'node:path';
import json from '@rollup/plugin-json';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import depsExternal from 'rollup-plugin-node-externals';
import { ScriptTarget } from 'typescript';

import { createLogger } from '../utils/createLogger';
import { locatePackage } from '../utils/locatePackage';
import { loadCompilerOptions } from './loadCompilerOptions';
import { bundleCssEmits } from './rollup-plugins/bundleCssEmits';

const logger = createLogger('buildPackage');

export const buildPackage = async (packageName: string): Promise<void> => {
  const packagePath = await locatePackage(packageName);

  logger.info('____PATH', packagePath);

  process.exit(0);

  const compilerOptions = loadCompilerOptions('tsconfig.json');

  const plugins = [vanillaExtractPlugin(), depsExternal(), esbuild(), json()];

  const emittedCssFiles = new Set<string>();

  const config: Array<RollupOptions> = [
    {
      input: 'src/main.ts',
      plugins: [...plugins, bundleCssEmits()],
      output: [
        {
          dir: 'dist',
          format: 'esm',
          preserveModules: true,
          // preserveModulesRoot: 'src',
          sourcemap: true,

          // Change .css.js files to something else so that they don't get re-processed by consumer's setup
          entryFileNames({ name }) {
            return `${name.replace(/\.css$/, '.css.vanilla')}.js`;
          },

          // Apply preserveModulesRoot to asset names
          assetFileNames(assetInfo) {
            // eslint-disable-next-line no-console
            console.log('__names', assetInfo.names);
            const assetPath = assetInfo.names[0].replace(/^src\//, 'assets/');
            if (/\.css$/.exec(assetPath)) {
              emittedCssFiles.add(assetPath);
            }
            return assetPath;
          },
          // assetFileNames: "assets/[name][extname]",

          exports: 'named',
        },
      ],
    },
    // Declaration files
    {
      input: 'src/main.ts',
      plugins: [
        ...plugins,
        dts({
          compilerOptions: {
            ...compilerOptions,
            baseUrl: path.resolve(compilerOptions.baseUrl || '.'),
            declaration: true,
            noEmit: false,
            emitDeclarationOnly: true,
            noEmitOnError: true,
            target: ScriptTarget.ESNext,
          },
        }),
      ],
      output: [
        {
          dir: 'dist',
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          // Change .css.js files to something else so that they don't get re-processed by consumer's setup
          entryFileNames({ name }) {
            return `${name.replace(/\.css$/, '.css.vanilla')}.d.ts`;
          },
        },
      ],
    },
  ];

  const compile = async (
    config: RollupOptions,
  ): Promise<Array<RollupOutput>> => {
    const build = await rollup(config);
    const outputs: Array<OutputOptions> = Array.isArray(config.output)
      ? config.output
      : config.output
        ? [config.output]
        : [];

    return Promise.all(outputs.map((output) => build.write(output)));
  };

  Promise.all(config.map(compile))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Build complete!');
    })
    .catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('Build failed:', error);
      process.exit(1);
    });
};
