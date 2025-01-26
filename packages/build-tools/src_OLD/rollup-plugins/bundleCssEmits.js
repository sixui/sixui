"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleCssEmits = void 0;
var node_path_1 = require("node:path");
var emittedCssFiles = new Set();
var bundleCssEmits = function () { return ({
    name: 'bundle-css-emits',
    buildStart: function () {
        emittedCssFiles.clear();
    },
    renderChunk: function (code, chunkInfo) {
        var allImports = __spreadArray([], code.matchAll(/import (?:.* from )?['"]([^;'"]*)['"];?/g), true);
        var dirname = node_path_1.default.dirname(chunkInfo.fileName);
        var output = allImports.reduce(function (resultingCode, _a) {
            var importLine = _a[0], moduleId = _a[1];
            if (emittedCssFiles.has(node_path_1.default.posix.join(dirname, moduleId))) {
                // eslint-disable-next-line no-console
                console.log('Stripping:', importLine);
                return resultingCode.replace(importLine, '');
            }
            return resultingCode;
        }, code);
        console.log('__chunkInfo', chunkInfo);
        return {
            code: output,
            map: chunkInfo.map || null,
        };
    },
    generateBundle: function (options, bundle) {
        var bundleCode = Array.from(emittedCssFiles.values())
            .map(function (file) { return bundle[file]; })
            .map(function (emitted) {
            return "/* ".concat(emitted.name, " -> ").concat(emitted.fileName, " */\n").concat(emitted.type === 'asset' ? emitted.source : '');
        })
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
}); };
exports.bundleCssEmits = bundleCssEmits;
