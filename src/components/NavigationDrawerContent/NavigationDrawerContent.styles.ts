import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { sideSheetContentTokens } from '../SideSheetContent/SideSheetContent.stylex';
import { navigationDrawerContentTokens as tokens } from './NavigationDrawerContent.stylex';

export type INavigationDrawerContentStylesKey =
  keyof typeof navigationDrawerContentStyles;
export const navigationDrawerContentStyles = stylex.create({
  host: {
    [sideSheetContentTokens.containerColor]: tokens.containerColor,
    [sideSheetContentTokens.containerElevation]: tokens.containerElevation,
  },
  inner: {
    paddingLeft: spacingTokens.padding$7,
    paddingRight: spacingTokens.padding$7,
  },
});
