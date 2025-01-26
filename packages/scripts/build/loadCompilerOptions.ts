import type { CompilerOptions } from 'typescript';
import { parseJsonConfigFileContent, readConfigFile, sys } from 'typescript';

export const loadCompilerOptions = (
  tsconfigFilePath: string,
): CompilerOptions => {
  const configFile = readConfigFile(tsconfigFilePath, (path) =>
    sys.readFile(path),
  );
  if (configFile.error) {
    if (typeof configFile.error.messageText === 'string') {
      throw new Error(configFile.error.messageText);
    }

    throw new Error(configFile.error.messageText.messageText);
  }

  const { options } = parseJsonConfigFileContent(configFile.config, sys, './');

  return options;
};
