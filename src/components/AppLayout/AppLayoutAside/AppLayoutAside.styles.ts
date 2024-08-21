import stylex from '@stylexjs/stylex';

import { appLayoutTokens } from '../AppLayout.stylex';

export type IAppLayoutAsideStylesKey = keyof typeof appLayoutAsideStyles;
export const appLayoutAsideStyles = stylex.create({
  host: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: appLayoutTokens.standardAsideWidth,
  },
  inner: {
    height: '100%',
  },
  inner$modal: {
    width: appLayoutTokens.modalAsideWidth,
  },
});
