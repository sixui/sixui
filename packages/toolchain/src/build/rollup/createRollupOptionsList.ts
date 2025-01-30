import type { OutputOptions, RollupOptions } from 'rollup';
import type { CompilerOptions } from 'typescript';
import path from 'node:path';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import depsExternal from 'rollup-plugin-node-externals';
import { ScriptTarget } from 'typescript';

import type { IBuildOptions } from '../build';
import { getPath } from '../../utils/getPath';
import { bundleCssEmitsPlugin } from './bundleCssEmitsPlugin';

// Change `.css.js` files to something else so that they don't get re-processed
// by consumer's setup.
const renameCss = (name: string, ext: string): string =>
  `${name.replace(/\.css$/, '.css.vanilla')}${ext}`;

export const createRollupOptionsList = (
  buildOptions: IBuildOptions,
  compilerOptions: CompilerOptions,
): Array<RollupOptions> => {
  const emittedCssFiles = new Set<string>();

  const tsconfigPath = getPath(buildOptions.tsconfig, buildOptions.cwd);
  const outDirPath = getPath(buildOptions.outDir, buildOptions.cwd);

  const plugins = [
    vanillaExtractPlugin(),
    typescript({
      tsconfig: tsconfigPath,
    }),
    depsExternal(),
    esbuild(),
    json(),
  ];

  const commonOutputOptions: OutputOptions = {
    dir: outDirPath,
    format: 'esm',
    preserveModules: true,
  };

  const inputPath = getPath(buildOptions.entryPoint, buildOptions.cwd);

  const mainOptions: RollupOptions = {
    input: inputPath,
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
        entryFileNames: ({ name }) => renameCss(name, '.js'),
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
    input: inputPath,
    plugins: [
      ...plugins,
      dts({
        compilerOptions: {
          ...compilerOptions,
          declaration: true,
          declarationDir: outDirPath,
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
        entryFileNames: ({ name }) => renameCss(name, '.d.ts'),
        ...buildOptions.outputOptions,
      },
    ],
  };

  return [mainOptions, declarationsOptions];
};
