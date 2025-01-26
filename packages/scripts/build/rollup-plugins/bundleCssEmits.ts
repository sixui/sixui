import type { Plugin, RenderedChunk } from 'rollup';
import path from 'path';

const emittedCSSFiles = new Set<string>();

export const bundleCssEmits = (): Plugin => ({
  name: 'bundle-css-emits',
  buildStart() {
    emittedCSSFiles.clear();
  },
  renderChunk(code: string, chunkInfo: RenderedChunk) {
    const allImports: Array<[string, string]> = [
      ...code.matchAll(/import (?:.* from )?['"]([^;'"]*)['"];?/g),
    ];
    const dirname = path.dirname(chunkInfo.fileName);
    const output = allImports.reduce(
      (resultingCode, [importLine, moduleId]) => {
        if (emittedCSSFiles.has(path.posix.join(dirname, moduleId))) {
          // eslint-disable-next-line no-console
          console.log('Stripping: ' + importLine);
          return resultingCode.replace(importLine, '');
        }
        return resultingCode;
      },
      code,
    );
    return {
      code: output,
      map: chunkInfo.map || null,
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
