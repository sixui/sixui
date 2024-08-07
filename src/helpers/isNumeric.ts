// https://stackoverflow.com/a/175787/7628220
export const isNumeric = (value: unknown): value is number => {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value !== 'string' || value === '') {
    return false;
  }

  return Number.isFinite(Number(value));
};
