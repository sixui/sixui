import type { SchemeContent } from '@material/material-color-utilities';

import { IThemeColorScheme } from '~/components/ThemeProvider';
import { getMaterialDynamicSchemeColor } from './getMaterialDynamicSchemeColor';

export const getRolesFromMaterialScheme = (
  scheme: SchemeContent,
): IThemeColorScheme => {
  return {
    primary: getMaterialDynamicSchemeColor('primary', scheme),
    onPrimary: getMaterialDynamicSchemeColor('onPrimary', scheme),
    primaryContainer: getMaterialDynamicSchemeColor('primaryContainer', scheme),
    onPrimaryContainer: getMaterialDynamicSchemeColor(
      'onPrimaryContainer',
      scheme,
    ),

    secondary: getMaterialDynamicSchemeColor('secondary', scheme),
    onSecondary: getMaterialDynamicSchemeColor('onSecondary', scheme),
    secondaryContainer: getMaterialDynamicSchemeColor(
      'secondaryContainer',
      scheme,
    ),
    onSecondaryContainer: getMaterialDynamicSchemeColor(
      'onSecondaryContainer',
      scheme,
    ),

    tertiary: getMaterialDynamicSchemeColor('tertiary', scheme),
    onTertiary: getMaterialDynamicSchemeColor('onTertiary', scheme),
    tertiaryContainer: getMaterialDynamicSchemeColor(
      'tertiaryContainer',
      scheme,
    ),
    onTertiaryContainer: getMaterialDynamicSchemeColor(
      'onTertiaryContainer',
      scheme,
    ),

    error: getMaterialDynamicSchemeColor('error', scheme),
    onError: getMaterialDynamicSchemeColor('onError', scheme),
    errorContainer: getMaterialDynamicSchemeColor('errorContainer', scheme),
    onErrorContainer: getMaterialDynamicSchemeColor('onErrorContainer', scheme),

    inverseSurface: getMaterialDynamicSchemeColor('inverseSurface', scheme),
    inverseOnSurface: getMaterialDynamicSchemeColor('inverseOnSurface', scheme),
    inversePrimary: getMaterialDynamicSchemeColor('inversePrimary', scheme),

    surface: getMaterialDynamicSchemeColor('surface', scheme),
    onSurface: getMaterialDynamicSchemeColor('onSurface', scheme),
    onSurfaceVariant: getMaterialDynamicSchemeColor('onSurfaceVariant', scheme),
    surfaceContainerLowest: getMaterialDynamicSchemeColor(
      'surfaceContainerLowest',
      scheme,
    ),
    surfaceContainerLow: getMaterialDynamicSchemeColor(
      'surfaceContainerLow',
      scheme,
    ),
    surfaceContainer: getMaterialDynamicSchemeColor('surfaceContainer', scheme),
    surfaceContainerHigh: getMaterialDynamicSchemeColor(
      'surfaceContainerHigh',
      scheme,
    ),
    surfaceContainerHighest: getMaterialDynamicSchemeColor(
      'surfaceContainerHighest',
      scheme,
    ),

    outline: getMaterialDynamicSchemeColor('outline', scheme),
    outlineVariant: getMaterialDynamicSchemeColor('outlineVariant', scheme),

    primaryFixed: getMaterialDynamicSchemeColor('primaryFixed', scheme),
    secondaryFixed: getMaterialDynamicSchemeColor('secondaryFixed', scheme),
    tertiaryFixed: getMaterialDynamicSchemeColor('tertiaryFixed', scheme),

    primaryFixedDim: getMaterialDynamicSchemeColor('primaryFixedDim', scheme),
    secondaryFixedDim: getMaterialDynamicSchemeColor(
      'secondaryFixedDim',
      scheme,
    ),
    tertiaryFixedDim: getMaterialDynamicSchemeColor('tertiaryFixedDim', scheme),

    onPrimaryFixed: getMaterialDynamicSchemeColor('onPrimaryFixed', scheme),
    onSecondaryFixed: getMaterialDynamicSchemeColor('onSecondaryFixed', scheme),
    onTertiaryFixed: getMaterialDynamicSchemeColor('onTertiaryFixed', scheme),

    onPrimaryFixedVariant: getMaterialDynamicSchemeColor(
      'onPrimaryFixedVariant',
      scheme,
    ),
    onSecondaryFixedVariant: getMaterialDynamicSchemeColor(
      'onSecondaryFixedVariant',
      scheme,
    ),
    onTertiaryFixedVariant: getMaterialDynamicSchemeColor(
      'onTertiaryFixedVariant',
      scheme,
    ),

    surfaceDim: getMaterialDynamicSchemeColor('surfaceDim', scheme),
    surfaceBright: getMaterialDynamicSchemeColor('surfaceBright', scheme),

    shadow: getMaterialDynamicSchemeColor('shadow', scheme),
    scrim: getMaterialDynamicSchemeColor('scrim', scheme),
  };
};
