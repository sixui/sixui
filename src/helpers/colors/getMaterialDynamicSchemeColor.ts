import {
  hexFromArgb,
  MaterialDynamicColors,
  DynamicColor,
  type DynamicScheme,
} from '@material/material-color-utilities';

export type IMaterialDynamicSchemeToken =
  | 'primaryPaletteKeyColor'
  | 'secondaryPaletteKeyColor'
  | 'tertiaryPaletteKeyColor'
  | 'neutralPaletteKeyColor'
  | 'neutralVariantPaletteKeyColor'
  | 'background'
  | 'onBackground'
  | 'surface'
  | 'surfaceDim'
  | 'surfaceBright'
  | 'surfaceContainerLowest'
  | 'surfaceContainerLow'
  | 'surfaceContainer'
  | 'surfaceContainerHigh'
  | 'surfaceContainerHighest'
  | 'onSurface'
  | 'surfaceVariant'
  | 'onSurfaceVariant'
  | 'inverseSurface'
  | 'inverseOnSurface'
  | 'outline'
  | 'outlineVariant'
  | 'shadow'
  | 'scrim'
  | 'surfaceTint'
  | 'primary'
  | 'onPrimary'
  | 'primaryContainer'
  | 'onPrimaryContainer'
  | 'inversePrimary'
  | 'secondary'
  | 'onSecondary'
  | 'secondaryContainer'
  | 'onSecondaryContainer'
  | 'tertiary'
  | 'onTertiary'
  | 'tertiaryContainer'
  | 'onTertiaryContainer'
  | 'error'
  | 'onError'
  | 'errorContainer'
  | 'onErrorContainer'
  | 'primaryFixed'
  | 'primaryFixedDim'
  | 'onPrimaryFixed'
  | 'onPrimaryFixedVariant'
  | 'secondaryFixed'
  | 'secondaryFixedDim'
  | 'onSecondaryFixed'
  | 'onSecondaryFixedVariant'
  | 'tertiaryFixed'
  | 'tertiaryFixedDim'
  | 'onTertiaryFixed'
  | 'onTertiaryFixedVariant';

export const getMaterialDynamicColor = (
  token: IMaterialDynamicSchemeToken,
): DynamicColor => {
  return MaterialDynamicColors[token];
};

export const getMaterialDynamicSchemeColor = (
  token: IMaterialDynamicSchemeToken,
  scheme: DynamicScheme,
): string => {
  const dynamicColor = getMaterialDynamicColor(token);
  const argbColor = dynamicColor.getArgb(scheme);
  const hexColor = hexFromArgb(argbColor);

  return hexColor;
};
