import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IScrimStyleKey } from '@/components/atoms/Scrim';
import { componentVars as vars } from './Scrim.stylex';

type IScrimStyles = IStyles<IScrimStyleKey>;
export const styles: MapNamespaces<IScrimStyles> = stylex.create<IScrimStyles>({
  host: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
    backgroundColor: vars.containerColor,
    WebkitTapHighlightColor: 'transparent',
    zIndex: 1000,
  },
});
