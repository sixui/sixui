import type {
  OutputAsset,
  OutputBundle,
  OutputChunk,
  Plugin,
  RenderedChunk,
  RollupOptions,
} from 'rollup';
import path from 'node:path';

export type IBuidleCssEmitsPluginOptions = {
  cssBundle: string;
  shouldStrip: (assetPath: string) => boolean;
  onReset: () => void;
  getEmittedAssets: () => Array<string>;
};

export const bundleCssEmitsPlugin = (
  pluginOptions: IBuidleCssEmitsPluginOptions,
): Plugin => ({
  name: 'bundle-css-emits-plugin',
  buildStart() {
    pluginOptions.onReset();
  },
  renderChunk(code: string, chunkInfo: RenderedChunk) {
    const allImports: Array<RegExpExecArray> = [
      ...code.matchAll(/import (?:.* from )?['"]([^;'"]*)['"];?/g),
    ];
    const dirname = path.dirname(chunkInfo.fileName);
    const output = allImports.reduce(
      (resultingCode, [importLine, moduleId]) => {
        if (
          pluginOptions.shouldStrip(path.posix.join(dirname, moduleId ?? ''))
        ) {
          return resultingCode.replace(importLine, '');
        }

        return resultingCode;
      },
      code,
    );

    return {
      code: output,
      map: null,
    };
  },
  generateBundle(_options: RollupOptions, bundle: OutputBundle) {
    const bundleCode = pluginOptions
      .getEmittedAssets()
      .map((file) => bundle[file])
      .filter((emitted): emitted is OutputAsset | OutputChunk =>
        Boolean(emitted),
      )
      .map((emitted) => {
        const source = emitted.type === 'asset' ? String(emitted.source) : '';
        const name = emitted.type === 'asset' ? emitted.names[0] : '';

        return `/* ${name} -> ${emitted.fileName} */\n${source}`;
      })
      .join('\n\n');

    this.emitFile({
      type: 'asset',
      name: pluginOptions.cssBundle,
      source: bundleCode,
    });
  },
});
