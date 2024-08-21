import type {
  IWindowSizeClassesTheme,
  IWindowSizeClassName,
} from '~/themes/base';

export type IWindowSizeClassContainerName =
  | IWindowSizeClassName
  | `${IWindowSizeClassName}AndUp`;

export type IResponsiveRule = {
  containerNames: Array<IWindowSizeClassContainerName>;
  minWidth: number;
  maxWidth?: number;
  query: string;
};

const serializeResponsiveRuleQuery = (
  minWidth: number,
  maxWidth?: number,
): string => {
  const queries = [
    `(min-width: ${minWidth}px)`,
    maxWidth !== undefined ? `(max-width: ${maxWidth}px)` : undefined,
  ];

  return queries.filter(Boolean).join(' and ');
};

export const getResponsiveRules = (
  classes: IWindowSizeClassesTheme,
): Array<IResponsiveRule> =>
  Object.entries(classes).reduce((acc, [key, breakpoint], index) => {
    const className = key as IWindowSizeClassName;
    const previousRule = index > 0 ? acc[index - 1] : undefined;
    const containerNames: Array<IWindowSizeClassContainerName> = previousRule
      ? [
          ...previousRule.containerNames.slice(0, -1),
          `${className}AndUp`,
          className,
        ]
      : [`${className}AndUp`, className];
    const minWidth = previousRule?.maxWidth ?? 0;
    const maxWidth = breakpoint ? breakpoint - 1 : undefined;
    const query = serializeResponsiveRuleQuery(minWidth, maxWidth);

    return [...acc, { containerNames, minWidth, maxWidth, query }];
  }, [] as Array<IResponsiveRule>);
