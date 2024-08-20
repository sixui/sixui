import stylex from '@stylexjs/stylex';

import { appLayoutPanesTokens } from './AppLayoutPanes.stylex';

export type IAppLayoutPaneStylesKey = keyof typeof appLayoutPaneStyles;
export const appLayoutPaneStyles = stylex.create({
  host: {
    border: '1px solid blue',
  },
});
