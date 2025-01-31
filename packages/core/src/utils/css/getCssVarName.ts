const GLOBAL_PREFIX = 'sixui';

export const getCssVarName = (path: Array<string>, ns?: string): string =>
  [GLOBAL_PREFIX, ns, path]
    .flat()
    .filter(Boolean)
    .join('-')
    .replaceAll('$', '-');
