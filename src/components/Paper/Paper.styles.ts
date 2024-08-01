import stylex from '@stylexjs/stylex';

import type { IPaperColor, IPaperCorner, IPaperElevation } from './Paper.types';
import { paperBaseTokens } from '~/components/PaperBase/PaperBase.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

export const getContainerTextColor = (surface?: IPaperColor): IPaperColor => {
  switch (surface) {
    case 'primary':
      return 'onPrimary';
    case 'primaryContainer':
      return 'onPrimaryContainer';
    case 'secondary':
      return 'onSecondary';
    case 'secondaryContainer':
      return 'onSecondaryContainer';
    case 'tertiary':
      return 'onTertiary';
    case 'tertiaryContainer':
      return 'onTertiaryContainer';
    case 'inverseSurface':
      return 'inverseOnSurface';
    case 'error':
      return 'onError';
    default:
      return 'onSurface';
  }
};

export const paperDynamicStyles = stylex.create({
  containerShape$topLeft: (corner: IPaperCorner) => ({
    [paperBaseTokens.containerShape$topLeft]: shapeTokens[`corner$${corner}`],
  }),
  containerShape$topRight: (corner: IPaperCorner) => ({
    [paperBaseTokens.containerShape$topRight]: shapeTokens[`corner$${corner}`],
  }),
  containerShape$bottomRight: (corner: IPaperCorner) => ({
    [paperBaseTokens.containerShape$bottomRight]:
      shapeTokens[`corner$${corner}`],
  }),
  containerShape$bottomLeft: (corner: IPaperCorner) => ({
    [paperBaseTokens.containerShape$bottomLeft]:
      shapeTokens[`corner$${corner}`],
  }),
  containerElevation: (level: IPaperElevation) => ({
    [paperBaseTokens.containerElevation]:
      elevationTokens[`boxShadow$level${level}`],
  }),
  surfaceColor: (color: IPaperColor) => ({
    [paperBaseTokens.containerColor]: colorSchemeTokens[color],
  }),
  textColor: (color: IPaperColor) => ({
    [paperBaseTokens.textColor]: colorSchemeTokens[color],
  }),
  outlineStyle: (style: string) => ({
    [paperBaseTokens.outlineStyle]: style,
  }),
});
