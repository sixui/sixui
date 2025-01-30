import type {
  OutputAsset,
  OutputBundle,
  OutputChunk,
  Plugin,
  RenderedChunk,
  RollupOptions,
} from 'rollup';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssNested from 'postcss-nested';

import { createLogger } from '../../utils/createLogger';

const PLUGIN_NAME = 'bundle-css-emits-plugin';

const logger = createLogger(PLUGIN_NAME);

export type IBuidleCssEmitsPluginOptions = {
  cssBundleKey: string;
  shouldStrip: (assetPath: string) => boolean;
  onReset: () => void;
  getEmittedAssets: () => Array<string>;
};

export const bundleCssEmitsPlugin = (
  pluginOptions: IBuidleCssEmitsPluginOptions,
): Plugin => ({
  name: PLUGIN_NAME,
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
          moduleId &&
          pluginOptions.shouldStrip(path.posix.join(dirname, moduleId))
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
  async generateBundle(_options: RollupOptions, bundle: OutputBundle) {
    const bundleCode = pluginOptions
      .getEmittedAssets()
      .map((file) => bundle[file])
      .filter((emitted): emitted is OutputAsset | OutputChunk =>
        Boolean(emitted),
      )
      .map((emitted) => {
        const source =
          (emitted.type === 'asset' ? String(emitted.source) : undefined) ||
          '?';
        const name =
          (emitted.type === 'asset' ? emitted.names[0] : undefined) || '?';

        return `/* ${name} -> ${emitted.fileName} */\n${source}`;
      })
      .join('\n\n');

    const postprocessedBundleCode = await postcss([
      postcssNested(),
      autoprefixer(),
    ]).process(bundleCode, { from: undefined });

    logger.success('CSS bundle generated.');

    this.emitFile({
      type: 'asset',
      name: pluginOptions.cssBundleKey,
      source: postprocessedBundleCode.css,
    });
  },
});
