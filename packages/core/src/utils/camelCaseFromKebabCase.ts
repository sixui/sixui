export const camelCaseFromKebabCase = (kebabCase: string): string =>
  kebabCase.replace(/-([a-z])/g, (_match, group: string) =>
    group.toUpperCase(),
  );
