import stylex from '@stylexjs/stylex';

import { appLayoutPanesTokens } from './AppLayoutPanes.stylex';

export type IAppLayoutPaneStylesKey = keyof typeof appShellPaneStyles;
export const appShellPaneStyles = stylex.create({
  host: {
    border: '1px solid blue',
  },
});
