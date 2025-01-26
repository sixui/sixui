"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCompilerOptions = void 0;
var typescript_1 = require("typescript");
var loadCompilerOptions = function (tsconfigFilePath) {
    var configFile = (0, typescript_1.readConfigFile)(tsconfigFilePath, function (path) {
        return typescript_1.sys.readFile(path);
    });
    if (configFile.error) {
        if (typeof configFile.error.messageText === 'string') {
            throw new Error(configFile.error.messageText);
        }
        throw new Error(configFile.error.messageText.messageText);
    }
    var options = (0, typescript_1.parseJsonConfigFileContent)(configFile.config, typescript_1.sys, './').options;
    return options;
};
exports.loadCompilerOptions = loadCompilerOptions;
