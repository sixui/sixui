const ROLLUP_EXCLUDE_USE_CLIENT = ['index', 'components/Sixui/sixuiHtmlProps'];

export const shouldPrependUseClient = (fileName: string): boolean =>
  !ROLLUP_EXCLUDE_USE_CLIENT.reduce<Array<string>>(
    (acc, name) => [...acc, `${name}.js`],
    [],
  ).includes(fileName);
