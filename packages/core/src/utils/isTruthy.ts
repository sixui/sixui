export const isTruthy = <TValue>(
  value: TValue | false | undefined,
): value is TValue => Boolean(value);
