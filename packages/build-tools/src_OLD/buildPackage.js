"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.buildPackage = void 0;
var node_path_1 = require("node:path");
var plugin_json_1 = require("@rollup/plugin-json");
var rollup_plugin_1 = require("@vanilla-extract/rollup-plugin");
var rollup_1 = require("rollup");
var rollup_plugin_dts_1 = require("rollup-plugin-dts");
var rollup_plugin_esbuild_1 = require("rollup-plugin-esbuild");
var rollup_plugin_node_externals_1 = require("rollup-plugin-node-externals");
var typescript_1 = require("typescript");
var createLogger_1 = require("../utils/createLogger");
var locatePackage_1 = require("../utils/locatePackage");
var loadCompilerOptions_1 = require("./loadCompilerOptions");
var bundleCssEmits_1 = require("./rollup-plugins/bundleCssEmits");
var logger = (0, createLogger_1.createLogger)('buildPackage');
var buildPackage = function (packageName) { return __awaiter(void 0, void 0, void 0, function () {
    var packagePath, compilerOptions, plugins, emittedCssFiles, config, compile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, locatePackage_1.locatePackage)(packageName)];
            case 1:
                packagePath = _a.sent();
                logger.info('____PATH', packagePath);
                process.exit(0);
                compilerOptions = (0, loadCompilerOptions_1.loadCompilerOptions)('tsconfig.json');
                plugins = [(0, rollup_plugin_1.vanillaExtractPlugin)(), (0, rollup_plugin_node_externals_1.default)(), (0, rollup_plugin_esbuild_1.default)(), (0, plugin_json_1.default)()];
                emittedCssFiles = new Set();
                config = [
                    {
                        input: 'src/main.ts',
                        plugins: __spreadArray(__spreadArray([], plugins, true), [(0, bundleCssEmits_1.bundleCssEmits)()], false),
                        output: [
                            {
                                dir: 'dist',
                                format: 'esm',
                                preserveModules: true,
                                // preserveModulesRoot: 'src',
                                sourcemap: true,
                                // Change .css.js files to something else so that they don't get re-processed by consumer's setup
                                entryFileNames: function (_a) {
                                    var name = _a.name;
                                    return "".concat(name.replace(/\.css$/, '.css.vanilla'), ".js");
                                },
                                // Apply preserveModulesRoot to asset names
                                assetFileNames: function (assetInfo) {
                                    // eslint-disable-next-line no-console
                                    console.log('__names', assetInfo.names);
                                    var assetPath = assetInfo.names[0].replace(/^src\//, 'assets/');
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
                        plugins: __spreadArray(__spreadArray([], plugins, true), [
                            (0, rollup_plugin_dts_1.dts)({
                                compilerOptions: __assign(__assign({}, compilerOptions), { baseUrl: node_path_1.default.resolve(compilerOptions.baseUrl || '.'), declaration: true, noEmit: false, emitDeclarationOnly: true, noEmitOnError: true, target: typescript_1.ScriptTarget.ESNext }),
                            }),
                        ], false),
                        output: [
                            {
                                dir: 'dist',
                                format: 'esm',
                                preserveModules: true,
                                preserveModulesRoot: 'src',
                                // Change .css.js files to something else so that they don't get re-processed by consumer's setup
                                entryFileNames: function (_a) {
                                    var name = _a.name;
                                    return "".concat(name.replace(/\.css$/, '.css.vanilla'), ".d.ts");
                                },
                            },
                        ],
                    },
                ];
                compile = function (config) { return __awaiter(void 0, void 0, void 0, function () {
                    var build, outputs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, rollup_1.rollup)(config)];
                            case 1:
                                build = _a.sent();
                                outputs = Array.isArray(config.output)
                                    ? config.output
                                    : config.output
                                        ? [config.output]
                                        : [];
                                return [2 /*return*/, Promise.all(outputs.map(function (output) { return build.write(output); }))];
                        }
                    });
                }); };
                Promise.all(config.map(compile))
                    .then(function () {
                    // eslint-disable-next-line no-console
                    console.log('Build complete!');
                })
                    .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.error('Build failed:', error);
                    process.exit(1);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.buildPackage = buildPackage;
