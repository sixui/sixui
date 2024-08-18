import stylex from '@stylexjs/stylex';

import { appShellTokens } from '../AppLayout.stylex';

export type IAppLayoutFooterStylesKey = keyof typeof appShellFooterStyles;
export const appShellFooterStyles = stylex.create({
  host: {
    height: appShellTokens.footerHeight,
    borderTop: '1px solid red',
    backgroundColor: '#ccc',
    zIndex: 9000,
  },
});
