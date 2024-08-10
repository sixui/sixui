import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IPlaygroundStylesKey = keyof typeof playgroundStyles;
export const playgroundStyles = stylex.create({
  host: {
    display: 'grid',
    gridTemplateColumns: `1fr calc(240px * ${scaleTokens.scale})`,
    gridAutoRows: '1fr',
    gap: spacingTokens.padding$2,
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
    backgroundImage: `radial-gradient(${colorSchemeTokens.outlineVariant} max(0.5px, 0.5px * ${scaleTokens.scale}), transparent 0)`,
    backgroundSize: `calc(10px * ${scaleTokens.scale}) calc(10px * ${scaleTokens.scale})`,
  },
  optionsPanel: {
    padding: spacingTokens.padding$4,
    backgroundColor: colorSchemeTokens.surfaceContainer,
    borderRadius: shapeTokens.corner$md,
  },
});
