import stylex from '@stylexjs/stylex';

import type { IZIndexTheme } from './zIndex.types';

export const zIndexTokens = stylex.defineVars<IZIndexTheme>({
  mobileStepper: '1000',
  fab: '1050',
  speedDial: '1050',
  appBar: '1100',
  drawer: '1200',
  modal: '1300',
  snackbar: '1400',
  tooltip: '1500',
});
