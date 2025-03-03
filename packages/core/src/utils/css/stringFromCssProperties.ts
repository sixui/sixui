import { getCssPropertyRawKey } from './getCssPropertyRawKey';

export const stringFromCssProperties = (
  styles: React.CSSProperties,
): string => {
  const text = Object.entries(styles)
    .map(([key, value]) => {
      if (value === undefined) {
        return '';
      }

      const rawKey = getCssPropertyRawKey(key);

      return `${rawKey}: ${value};`;
    })
    .join('');

  return `${text}\n`;
};
