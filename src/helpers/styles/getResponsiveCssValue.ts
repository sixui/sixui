import { fallbackVar } from '@vanilla-extract/css';

import type { IThemeWindowSizeClassName } from '~/components/ThemeProvider';
import { Responsive } from '~/components/Responsive';

export const responsiveStyleRuleOperators = ['=', '<', '>='] as const;
export type IResponsiveStyleRuleOperator =
  (typeof responsiveStyleRuleOperators)[number];

export interface IResponsiveStyleRule {
  op?: IResponsiveStyleRuleOperator;
  size: IThemeWindowSizeClassName;
  then?: string;
  else?: string;
}

export const getResponsiveCssValue = (rule: IResponsiveStyleRule): string => {
  const op = rule.op ?? '=';
  const vars = Responsive.theme.tokens.windowSizeClass[rule.size];
  const selectedVars =
    op === '='
      ? [vars.on, vars.off]
      : op === '<'
        ? [vars.lt, vars.gte]
        : [vars.gte, vars.lt];

  return [
    fallbackVar(selectedVars[0], rule.then ?? 'unset'),
    fallbackVar(selectedVars[1], rule.else ?? 'unset'),
  ].join(' ');
};
