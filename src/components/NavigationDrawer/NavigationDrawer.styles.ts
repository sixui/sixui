import stylex from '@stylexjs/stylex';
import { navigationDrawerTokens } from './NavigationDrawer.stylex';

export type INavigationDrawerStylesKey = keyof typeof navigationDrawerStyles;
export const navigationDrawerStyles = stylex.create({
  host: {
    backgroundColor: navigationDrawerTokens.containerColor,
  },
});
