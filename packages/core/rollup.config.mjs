import path from 'path';
import json from '@rollup/plugin-json';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import depsExternal from 'rollup-plugin-node-externals';
import ts from 'typescript';

const loadCompilerOptions = (tsconfig) => {
  if (!tsconfig) return {};
  const configFile = ts.readConfigFile(tsconfig, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    './',
  );
  return options;
};

/** @type {Set<string>} */
const emittedCSSFiles = new Set();

/**
 * @return {() => import('rollup').Plugin}
 */
const bundleCssEmits = () => ({
  name: 'bundle-css-emits',
  buildStart() {
    emittedCSSFiles.clear();
  },
  /**
   * @param {string} code
   * @param {import('rollup').RenderedChunk} chunkInfo
   */
  renderChunk(code, chunkInfo) {
    /** @type Array<[string, string]> */
    const allImports = [
      ...code.matchAll(/import (?:.* from )?['"]([^;'"]*)['"];?/g),
    ];
    const dirname = path.dirname(chunkInfo.fileName);
    const output = allImports.reduce(
      (resultingCode, [importLine, moduleId]) => {
        if (emittedCSSFiles.has(path.posix.join(dirname, moduleId))) {
          console.log('Stripping: ' + importLine);
          return resultingCode.replace(importLine, '');
        }
        return resultingCode;
      },
      code,
    );
    return {
      code: output,
      map: chunkInfo.map ?? null,
    };
  },
  /**
   * @param {import('rollup').RollupOptions} options
   * @param {{ [fileName: string]: import('rollup').EmittedAsset | import('rollup').EmittedChunk }} bundle
   */
  generateBundle(options, bundle) {
    const bundleCode = Array.from(emittedCSSFiles.values())
      .map((file) => bundle[file])
      .map(
        ({ name, fileName, source }) =>
          `/* ${name} -> ${fileName} */\n` + source,
      )
      .join('\n\n');
    this.emitFile({
      type: 'asset',
      name: 'src/bundle.css',
      source: bundleCode,
    });
    // this.emitFile({
    //   type: 'asset',
    //   name: 'src/index.css',
    //   source: Array.from(emittedCSSFiles).map(name => `@import "${name.replace(/^assets\//, './')}";`).join('\n') + '\n',
    // });
  },
});

const compilerOptions = loadCompilerOptions('tsconfig.json');

const plugins = [vanillaExtractPlugin(), depsExternal(), esbuild(), json()];

export default [
  {
    input: 'src/index.ts',
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
          const assetPath = assetInfo.name.replace(/^src\//, 'assets/');
          if (assetPath.match(/\.css$/)) {
            emittedCSSFiles.add(assetPath);
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
    input: 'src/index.ts',
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
          target: ts.ScriptTarget.ESNext,
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
