import cx from 'clsx';

export const mergeClassNames = <
  TCurrentStyleName extends string,
  TExtraStyleName extends string,
>(
  currentClassNames:
    | Partial<Record<TCurrentStyleName, Parameters<typeof cx>[0]>>
    | undefined,
  extraClassNames:
    | Partial<Record<TExtraStyleName, Parameters<typeof cx>[0]>>
    | undefined,
): Partial<Record<TCurrentStyleName | TExtraStyleName, string>> => {
  const classNames = {
    ...currentClassNames,
    ...extraClassNames,
  };

  return {
    ...classNames,
    ...Object.keys(classNames).reduce(
      (acc, key) => ({
        ...acc,
        [key]: cx([
          currentClassNames?.[key as TCurrentStyleName],
          extraClassNames?.[key as TExtraStyleName],
        ]),
      }),
      {} as Record<TCurrentStyleName | TExtraStyleName, string>,
    ),
  };
};
