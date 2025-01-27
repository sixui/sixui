export const dashedCaseFromCamelCase = (camelCase: string): string =>
  camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
