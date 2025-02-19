import cx from 'clsx';

type IClassNames<TClassName extends string> =
  | Partial<Record<TClassName, Parameters<typeof cx>[0]>>
  | undefined;

export const mergeClassNames = <
  TCurrentStyleName extends string,
  TExtraStyleName extends string,
>(
  currentClassNames: IClassNames<TCurrentStyleName>,
  extraClassNames: IClassNames<TExtraStyleName>,
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
