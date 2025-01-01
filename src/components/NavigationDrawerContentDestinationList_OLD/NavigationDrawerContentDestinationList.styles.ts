import stylex from '@stylexjs/stylex';

import { dividerTokens } from '~/components/Divider/Divider.stylex';
import { listTokens } from '~/components/List/List.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { navigationDrawerContentDestinationListTokens as tokens } from './NavigationDrawerContentDestinationList.stylex';

export type INavigationDrawerContentDestinationListStylesKey =
  keyof typeof navigationDrawerContentDestinationListStyles;
export const navigationDrawerContentDestinationListStyles = stylex.create({
  host: {
    paddingLeft: spacingTokens.padding$7,
    paddingRight: spacingTokens.padding$7,
  },
  list: {
    marginLeft: `calc(-1 * ${spacingTokens.padding$4})`,
    marginRight: `calc(-1 * ${spacingTokens.padding$4})`,

    [listTokens.topSpace]: 0,
    [listTokens.bottomSpace]: 0,
  },
  headline: {
    color: tokens.headlineTextColor,
    fontFamily: tokens.headlineTextFont,
    lineHeight: tokens.headlineTextLineHeight,
    fontSize: tokens.headlineTextSize,
    letterSpacing: tokens.headlineTextLetterSpacing,
    fontWeight: tokens.headlineTextWeight,
  },
  divider: {
    [dividerTokens.color]: tokens.dividerColor,
    marginTop: spacingTokens.padding$1,
  },
});
