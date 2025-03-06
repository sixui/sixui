export type INumericValueConstraints =
  | number
  | {
      min?: number;
      max?: number;
    };

export type INumericValueValidationResult = true | 'tooSmall' | 'tooLarge';

export const validateNumericValue = (
  value: number,
  acceptableValue?: INumericValueConstraints,
): INumericValueValidationResult => {
  if (acceptableValue === undefined) {
    return true;
  }

  if (typeof acceptableValue === 'number') {
    return value === acceptableValue
      ? true
      : value < acceptableValue
        ? 'tooSmall'
        : 'tooLarge';
  }

  const { min, max } = acceptableValue;

  if (min !== undefined && value < min) {
    return 'tooSmall';
  }

  if (max !== undefined && value > max) {
    return 'tooLarge';
  }

  return true;
};
