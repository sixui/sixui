import stylex from '@stylexjs/stylex';

import { appShellTokens } from '../AppShell.stylex';

export type IAppShellFooterStylesKey = keyof typeof appShellFooterStyles;
export const appShellFooterStyles = stylex.create({
  host: {
    height: appShellTokens.footerHeight,
    borderTop: '1px solid red',
    backgroundColor: '#ccc',
    zIndex: 9000,
  },
});
