import type { IThemeWindowSizeClassName } from '~/components/Theme';
import { Responsive } from '~/components/Responsive';

export const responsiveStyleRuleOperators = ['=', '!=', '<', '>='] as const;
export type IResponsiveStyleRuleOperator =
  (typeof responsiveStyleRuleOperators)[number];

export interface IResponsiveStyleRule {
  op?: IResponsiveStyleRuleOperator;
  size: IThemeWindowSizeClassName;
}

export const responsiveContainerQuery = (
  rule: IResponsiveStyleRule,
): string => {
  const op = rule.op ?? '=';
  const tokenGroup = Responsive.theme.tokens.windowSizeClass[rule.size];
  const token = ['=', '!='].includes(op) ? tokenGroup.on : tokenGroup.gte;
  const isNegative = ['!=', '<'].includes(op);
  const query = `${isNegative ? 'not ' : ''}style(${token.slice(4, -1)})`;

  return query;
};
