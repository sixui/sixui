import stylex from '@stylexjs/stylex';

import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutNavigationDrawerStylesKey =
  keyof typeof appLayoutNavigationDrawerStyles;
export const appLayoutNavigationDrawerStyles = stylex.create({
  host: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.standardNavigationDrawerWidth,
  },
  inner: {
    height: '100%',
  },
  inner$modal: {
    width: appLayoutTokens.modalNavigationDrawerWidth,
  },
});
