import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import { scaleTokens } from '~/themes/base/scale.stylex';

export const tonalPaletteStyles = stylex.create({
  host: {
    display: 'flex',
    height: `calc(72px * ${scaleTokens.scale})`,
    justifyContent: 'space-evenly',
  },
  tone: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    position: 'relative',
  },
  toneColor: (
    bg: string | StyleXVar<string>,
    text: string | StyleXVar<string>,
  ) => ({
    backgroundColor: bg,
    color: text,
  }),
  toneLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowWrap: 'break-word',
    textTransform: 'capitalize',
  },
});
