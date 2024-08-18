import stylex from '@stylexjs/stylex';

import { appShellTokens } from '../AppShell.stylex';

export type IAppShellHeaderStylesKey = keyof typeof appShellHeaderStyles;
export const appShellHeaderStyles = stylex.create({
  host: {
    height: appShellTokens.headerHeight,
    borderBottom: '3px solid red',
    backgroundColor: '#ccc',
    zIndex: 9000,
  },
});
