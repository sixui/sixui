export const keys = <T extends object, TKey extends keyof T>(
  object: T,
): Array<TKey> => Object.keys(object) as Array<TKey>;
