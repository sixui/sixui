import type { StyleXStyles } from '@stylexjs/stylex';

import type { IFabVariant } from '../Fab.types';
import { brandedFabStyles } from './BrandedFab.styles';
import { primaryFabStyles } from './PrimaryFab.styles';
import { secondaryFabStyles } from './SecondaryFab.styles';
import { surfaceFabStyles } from './SurfaceFab.styles';
import { tertiaryFabStyles } from './TertiaryFab.styles';

export const fabVariantStyles: {
  [key in IFabVariant]: Record<string, StyleXStyles>;
} = {
  branded: brandedFabStyles,
  primary: primaryFabStyles,
  secondary: secondaryFabStyles,
  surface: surfaceFabStyles,
  tertiary: tertiaryFabStyles,
};
