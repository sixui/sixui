import type {
  IThemeWindowSizeClassesValues,
  IThemeWindowSizeClassName,
} from '~/components/Theme';
import { serializeResponsiveRuleQuery } from './serializeResponsiveRuleQuery';

export type IWindowSizeClassContainerName =
  | IThemeWindowSizeClassName
  | `${IThemeWindowSizeClassName}AndUp`;

export type IResponsiveRule = {
  containerNames: Array<IWindowSizeClassContainerName>;
  minWidth: string;
  maxWidth: string | undefined;
  query: string;
};

export const getResponsiveRules = (
  windowSizeClasses: IThemeWindowSizeClassesValues,
): Array<IResponsiveRule> =>
  Object.entries(windowSizeClasses).reduce<Array<IResponsiveRule>>(
    (acc, [key, breakpoint], index) => {
      const windowClassName = key as IThemeWindowSizeClassName;
      const previousRule = index > 0 ? acc[index - 1] : undefined;

      const containerNames: Array<IWindowSizeClassContainerName> = previousRule
        ? [
            ...previousRule.containerNames.slice(0, -1),
            `${windowClassName}AndUp`,
            windowClassName,
          ]
        : [`${windowClassName}AndUp`, windowClassName];
      const minWidth = previousRule?.maxWidth ?? '0';
      const maxWidth = breakpoint;
      const query = serializeResponsiveRuleQuery({
        minWidth,
        maxWidth,
      });

      return [...acc, { containerNames, minWidth, maxWidth, query }];
    },
    [],
  );
