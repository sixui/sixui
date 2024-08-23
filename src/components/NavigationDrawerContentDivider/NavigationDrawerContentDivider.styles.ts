import stylex from '@stylexjs/stylex';

import { dividerTokens } from '~/components/Divider/Divider.stylex';
import { navigationDrawerContentDividerTokens as tokens } from './NavigationDrawerContentDivider.stylex';

export type INavigationDrawerContentDividerStylesKey =
  keyof typeof navigationDrawerContentDividerStyles;
export const navigationDrawerContentDividerStyles = stylex.create({
  host: {
    marginTop: tokens.space,
    marginBottom: tokens.space,

    [dividerTokens.color]: tokens.color,
  },
});
