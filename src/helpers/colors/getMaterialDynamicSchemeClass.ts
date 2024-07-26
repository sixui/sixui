import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';

import { IDynamicSchemeVariant } from './generateThemeFromSourceColor';
import { SixuiMaterialDynamicScheme } from './materialDynamicSchemes';

const materialDynamicSchemeClasses: Record<
  IDynamicSchemeVariant,
  typeof SchemeTonalSpot
> = {
  [IDynamicSchemeVariant.content]: SchemeContent,
  [IDynamicSchemeVariant.expressive]: SchemeExpressive,
  [IDynamicSchemeVariant.fidelity]: SchemeFidelity,
  [IDynamicSchemeVariant.fruitSalad]: SchemeFruitSalad,
  [IDynamicSchemeVariant.monochrome]: SchemeMonochrome,
  [IDynamicSchemeVariant.neutral]: SchemeNeutral,
  [IDynamicSchemeVariant.rainbow]: SchemeRainbow,
  [IDynamicSchemeVariant.tonalSpot]: SchemeTonalSpot,
  [IDynamicSchemeVariant.vibrant]: SchemeVibrant,
  [IDynamicSchemeVariant.sixui]: SixuiMaterialDynamicScheme,
};

export const getMaterialDynamicSchemeClass = (
  variant: IDynamicSchemeVariant,
): typeof SchemeTonalSpot => materialDynamicSchemeClasses[variant];
