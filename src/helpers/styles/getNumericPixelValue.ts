export const getNumericPixelValue = (
  value: number | string,
): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }

  if (Number.isFinite(Number(value))) {
    return Number(value);
  }

  if (typeof value === 'string' && /^[\d.]+(px|r?em)$/.test(value)) {
    if (value.endsWith('rem')) {
      return Number(value.replace('rem', '')) * 16;
    }

    if (value.endsWith('em')) {
      return Number(value.replace('em', '')) * 16;
    }

    if (value.endsWith('px')) {
      return Number(value.replace('px', ''));
    }
  }

  return undefined;
};
