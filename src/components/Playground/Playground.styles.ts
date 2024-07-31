import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';

export type IPlaygroundStylesKey = keyof typeof playgroundStyles;
export const playgroundStyles = stylex.create({
  host: {
    display: 'grid',
    gridTemplateColumns: '1fr 240px',
    gridAutoRows: '1fr',
    gap: 8,
  },
  componentPanel: {
    display: 'flex',
    borderRadius: shapeTokens.corner$md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outlineVariant,
    overflow: 'hidden',
  },
  componentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flexGrow: 1,
    backgroundColor: colorSchemeTokens.surfaceContainerLowest,
  },
  optionsPanel: {
    padding: 16,
    backgroundColor: colorSchemeTokens.surfaceContainer,
    borderRadius: shapeTokens.corner$md,
  },
});
