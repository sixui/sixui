export const getVarNameFromToken = (token: string): string =>
  token.substring(4, token.length - 1);
