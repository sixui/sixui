import { dashedCaseFromCamelCase } from '../dashedCaseFromCamelCase';

export const textFromCssProperties = (styles: React.CSSProperties): string =>
  Object.entries(styles)
    .map(([key, value]) => {
      const isVar = key.startsWith('--');
      const formattedKey = isVar ? key : dashedCaseFromCamelCase(key);

      return `${formattedKey}: ${value}`;
    })
    .join('; ');
