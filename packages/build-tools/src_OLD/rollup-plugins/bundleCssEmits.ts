import type {
  EmittedAsset,
  EmittedChunk,
  Plugin,
  RenderedChunk,
  RollupOptions,
} from 'rollup';
import path from 'node:path';

const emittedCssFiles = new Set<string>();

export const bundleCssEmits = (): Plugin => ({
  name: 'bundle-css-emits',
  buildStart() {
    emittedCssFiles.clear();
  },
  renderChunk(code: string, chunkInfo: RenderedChunk) {
    const allImports: Array<RegExpExecArray> = [
      ...code.matchAll(/import (?:.* from )?['"]([^;'"]*)['"];?/g),
    ];
    const dirname = path.dirname(chunkInfo.fileName);
    const output = allImports.reduce(
      (resultingCode, [importLine, moduleId]) => {
        if (emittedCssFiles.has(path.posix.join(dirname, moduleId))) {
          // eslint-disable-next-line no-console
          console.log('Stripping:', importLine);
          return resultingCode.replace(importLine, '');
        }
        return resultingCode;
      },
      code,
    );

    console.log('__chunkInfo', chunkInfo);

    return {
      code: output,
      map: chunkInfo.map || null,
    };
  },
  generateBundle(
    options: RollupOptions,
    bundle: Record<string, EmittedAsset | EmittedChunk>,
  ) {
    const bundleCode = Array.from(emittedCssFiles.values())
      .map((file) => bundle[file])
      .map(
        (emitted) =>
          `/* ${emitted.name} -> ${emitted.fileName} */\n${emitted.type === 'asset' ? emitted.source : ''}`,
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
    //   source: Array.from(emittedCssFiles).map(name => `@import "${name.replace(/^assets\//, './')}";`).join('\n') + '\n',
    // });
  },
});
