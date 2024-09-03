import cx from 'clsx';

export const mergeClassNames = <TStyleName extends string>(
  currentClassNames:
    | Partial<Record<TStyleName, Parameters<typeof cx>[0]>>
    | undefined,
  extraClassNames: Partial<Record<TStyleName, Parameters<typeof cx>[0]>>,
): Partial<Record<TStyleName, string>> => ({
  ...extraClassNames,
  ...Object.keys(currentClassNames ?? extraClassNames).reduce(
    (acc, key) => ({
      ...acc,
      [key]: cx([
        currentClassNames?.[key as TStyleName],
        extraClassNames[key as TStyleName],
      ]),
    }),
    {} as Record<TStyleName, string>,
  ),
});
