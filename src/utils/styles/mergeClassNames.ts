import type cx from 'clsx';

export const mergeClassNames = <TStyleName extends string>(
  currentClassNames:
    | Partial<Record<TStyleName, Parameters<typeof cx>[0]>>
    | undefined,
  extraClassNames: Partial<Record<TStyleName, Parameters<typeof cx>[0]>>,
): Partial<Record<TStyleName, Parameters<typeof cx>[0]>> =>
  currentClassNames
    ? Object.keys(extraClassNames).reduce(
        (acc, key) => ({
          ...acc,
          [key]: [
            currentClassNames[key as TStyleName],
            extraClassNames[key as TStyleName],
          ],
        }),
        {} as Record<TStyleName, Parameters<typeof cx>[0]>,
      )
    : extraClassNames;
