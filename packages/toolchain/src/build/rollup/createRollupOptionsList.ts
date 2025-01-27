import type { OutputOptions, RollupOptions } from 'rollup';
import type { CompilerOptions } from 'typescript';
import path from 'node:path';
import json from '@rollup/plugin-json';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import depsExternal from 'rollup-plugin-node-externals';
import { ScriptTarget } from 'typescript';

import type { IBuildOptions } from '../build';
import { getPath } from '../../utils/getPath';
import { bundleCssEmitsPlugin } from './bundleCssEmitsPlugin';

export const createRollupOptionsList = (
  buildOptions: IBuildOptions,
  compilerOptions: CompilerOptions,
): Array<RollupOptions> => {
  const emittedCssFiles = new Set<string>();

  const plugins = [vanillaExtractPlugin(), depsExternal(), esbuild(), json()];

  const commonOutputOptions: OutputOptions = {
    dir: buildOptions.outDir,
    format: 'esm',
    preserveModules: true,
  };

  const input = getPath(buildOptions.entryPoint, buildOptions.cwd);

  const mainOptions: RollupOptions = {
    input,
    plugins: [
      ...plugins,
      bundleCssEmitsPlugin({
        cssBundle: path.join(
          buildOptions.rootDir,
          buildOptions.cssOutputBundleName,
        ),
        shouldStrip: (assetPath) => emittedCssFiles.has(assetPath),
        onReset: () => {
          emittedCssFiles.clear();
        },
        getEmittedAssets: () => Array.from(emittedCssFiles),
      }),
    ],
    output: [
      {
        ...commonOutputOptions,
        sourcemap: true,
        // Change `.css.js` files to something else so that they don't get
        // re-processed by consumer's setup.
        entryFileNames({ name }) {
          return `${name.replace(/\.css$/, '.css.vanilla')}.js`;
        },
        // Apply preserveModulesRoot to asset names.
        assetFileNames(assetInfo) {
          const name = assetInfo.names[0] ?? '';
          const assetPath = path.join(
            'assets',
            path.relative(buildOptions.rootDir, name),
          );
          if (/\.css$/.exec(assetPath)) {
            emittedCssFiles.add(assetPath);
          }

          return assetPath;
        },
        exports: 'named',
        ...buildOptions.outputOptions,
      },
    ],
  };

  const declarationsOptions: RollupOptions = {
    input,
    plugins: [
      ...plugins,
      dts({
        compilerOptions: {
          ...compilerOptions,
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
        ...commonOutputOptions,
        preserveModulesRoot: buildOptions.rootDir,
        // Change .css.js files to something else so that they don't get
        // re-processed by consumer's setup.
        entryFileNames({ name }) {
          return `${name.replace(/\.css$/, '.css.vanilla')}.d.ts`;
        },
        ...buildOptions.outputOptions,
      },
    ],
  };

  return [mainOptions, declarationsOptions];
};
