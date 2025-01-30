const EXCLUDE_LIST = ['index'];

export const shouldPrependUseClient = (fileName: string): boolean =>
  !EXCLUDE_LIST.reduce<Array<string>>((acc, name) => {
    acc.push(`${name}.js`);
    return acc;
  }, []).includes(fileName);
