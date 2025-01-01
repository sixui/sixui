import stylex from '@stylexjs/stylex';

import { sideSheetContentTokens } from '~/components/SideSheetContent/SideSheetContent.stylex';
import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationDrawerStylesKey =
  keyof typeof appLayoutNavigationDrawerStyles;
export const appLayoutNavigationDrawerStyles = stylex.create({
  host: {
    height: '100%',
  },
  transitionContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.standardNavigationDrawerWidth,
  },
  navigationDrawerContent: {
    height: '100%',
  },
  inner$modal: {
    width: appLayoutTokens.modalNavigationDrawerWidth,
  },
});

export const appLayoutNavigationDrawerSideSheetContentStyles = stylex.create({
  host: {
    [sideSheetContentTokens.dividerColor]: appLayoutTokens.dividerColor,
    [sideSheetContentTokens.dividerWidth]: appLayoutTokens.dividerWidth,
  },
});
