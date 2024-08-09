import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IPlaygroundStylesKey = keyof typeof playgroundStyles;
export const playgroundStyles = stylex.create({
  host: {
    display: 'grid',
    gridTemplateColumns: '1fr 240px',
    gridAutoRows: '1fr',
    gap: 8,
  },
  componentPanel: {
    position: 'relative',
    display: 'flex',
    borderRadius: shapeTokens.corner$md,
    borderWidth: outlineTokens.width$xs,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outlineVariant,
    overflow: 'hidden',
  },
  componentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacingTokens.padding$6,
    flexGrow: 1,
    backgroundColor: colorSchemeTokens.surfaceContainerLowest,
    backgroundImage: `radial-gradient(${colorSchemeTokens.outlineVariant} 0.5px, transparent 0)`,
    backgroundSize: '10px 10px',
  },
  optionsPanel: {
    padding: spacingTokens.padding$4,
    backgroundColor: colorSchemeTokens.surfaceContainer,
    borderRadius: shapeTokens.corner$md,
  },
});
