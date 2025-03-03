export const getVarNameFromToken = (token: string): string =>
  token.substring('var('.length, token.length - 1);
