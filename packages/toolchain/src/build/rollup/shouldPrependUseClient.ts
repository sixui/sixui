const EXCLUDE_LIST = ['index'];

export const shouldPrependUseClient = (fileName: string): boolean =>
  !EXCLUDE_LIST.reduce<Array<string>>(
    (acc, name) => [...acc, `${name}.js`],
    [],
  ).includes(fileName);
