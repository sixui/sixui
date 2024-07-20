import stylex from '@stylexjs/stylex';

import { shapeTokens } from '@/themes/base/shape.stylex';
import { colorButtonTokens } from '@/components/ColorButton/ColorButton.stylex';
import { paperBaseTokens } from '@/components/PaperBase/PaperBase.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

export type ITonalColorPickerContentStylesKey =
  keyof typeof basicTemplateStyles;
export const basicTemplateStyles = stylex.create({
  host: {
    width: 'min-content',
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainer,
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level2,
    [paperBaseTokens.containerShape]: shapeTokens.corner$xs,
  },
  section: {
    padding: 12,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tones: {
    minWidth: 40,
  },
  colorButton: {
    [colorButtonTokens.containerShape]: shapeTokens.corner$none,
  },
  colorButton$first: {
    [colorButtonTokens.containerShape]: shapeTokens.cornerTop$xs,
  },
  colorButton$last: {
    [colorButtonTokens.containerShape]: shapeTokens.cornerBottom$xs,
  },
});
