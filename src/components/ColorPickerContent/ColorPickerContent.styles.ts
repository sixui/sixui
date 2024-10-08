import stylex from '@stylexjs/stylex';

import { shapeTokens } from '~/themes/base/shape.stylex';
import { colorButtonTokens } from '../ColorButton/ColorButton.stylex';
import { paperBaseTokens } from '../PaperBase/PaperBase.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IColorPickerContentStylesKey =
  keyof typeof colorPickerContentStyles;
export const colorPickerContentStyles = stylex.create({
  host: {
    width: 'min-content',
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainer,
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level2,
    [paperBaseTokens.containerShape$topLeft]: shapeTokens.corner$xs,
    [paperBaseTokens.containerShape$topRight]: shapeTokens.corner$xs,
    [paperBaseTokens.containerShape$bottomRight]: shapeTokens.corner$xs,
    [paperBaseTokens.containerShape$bottomLeft]: shapeTokens.corner$xs,
  },
  section: {
    padding: spacingTokens.padding$3,
  },
  tones: {},
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
