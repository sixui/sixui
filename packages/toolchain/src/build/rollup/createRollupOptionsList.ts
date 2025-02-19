import type { OutputOptions, RollupOptions } from 'rollup';
import type { CompilerOptions } from 'typescript';
import path from 'node:path';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import postcssImport from 'postcss-import';
import banner from 'rollup-plugin-banner2';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import depsExternal from 'rollup-plugin-node-externals';
import postcssPlugin from 'rollup-plugin-postcss';
import { ScriptTarget } from 'typescript';

import type { IBuildOptions } from '../build';
import { getCssFileName } from '~/utils/getCssFileName';
import { getPath } from '~/utils/getPath';
import { bundleCssEmitsPlugin } from './bundleCssEmitsPlugin';
import { shouldPrependUseClient } from './shouldPrependUseClient';

const BUNDLE_CSS_KEY = '__bundle.css';
const TMP_DIR = 'tmp';

export const createRollupOptionsList = (
  buildOptions: IBuildOptions,
  compilerOptions: CompilerOptions,
): Array<RollupOptions> => {
  const emittedCssFiles = new Set<string>();

  const tsconfigPath = getPath(buildOptions.tsconfig, buildOptions.cwd);
  const outDirPath = getPath(buildOptions.outDir, buildOptions.cwd);

  const plugins = [
    postcssPlugin({
      plugins: [postcssImport()],
      extract: path.join(TMP_DIR, 'extracted.css'),
      onExtract: ({ codeFileName }) => {
        emittedCssFiles.add(codeFileName);

        return true;
      },
    }),
    vanillaExtractPlugin(),
    typescript({ tsconfig: tsconfigPath }),
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
      banner((chunk) => {
        if (shouldPrependUseClient(chunk.fileName)) {
          return "'use client';\n\n";
        }

        return undefined;
      }),
      bundleCssEmitsPlugin({
        cssBundleKey: BUNDLE_CSS_KEY,
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
        entryFileNames: ({ name }) => getCssFileName(name, '.js'),
        // Apply preserveModulesRoot to asset names.
        assetFileNames(assetInfo) {
          const name = assetInfo.names[0] ?? '';
          const assetPath = path.join(
            TMP_DIR,
            path.relative(buildOptions.rootDir, name),
          );

          if (name === BUNDLE_CSS_KEY) {
            return buildOptions.cssOutputBundleName;
          }

          if (assetPath.endsWith('.css')) {
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
        entryFileNames: ({ name }) => getCssFileName(name, '.d.ts'),
        ...buildOptions.outputOptions,
      },
    ],
  };

  return [mainOptions, declarationsOptions];
};
