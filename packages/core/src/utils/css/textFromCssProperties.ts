import { dashedCaseFromCamelCase } from '../dashedCaseFromCamelCase';

export interface ITextFromCssPropertiesOptions {
  indent?: number;
  initialIndent?: boolean;
}

const defaultOptions = {
  indent: 0,
  initialIndent: true,
};

export const textFromCssProperties = (
  styles: React.CSSProperties,
  userOptions?: ITextFromCssPropertiesOptions,
): string => {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  const text = Object.entries(styles)
    .map(([key, value], index) => {
      const indent = index !== 0 || options.initialIndent ? options.indent : 0;
      const isVar = key.startsWith('--');
      const formattedKey = isVar ? key : dashedCaseFromCamelCase(key);

      return `${' '.repeat(indent)}${formattedKey}: ${value};`;
    })
    .join(options.indent ? `\n` : ' ');

  return `${text}\n`;
};
