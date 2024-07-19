import stylex from '@stylexjs/stylex';

import { shapeTokens } from '@/themes/base/shape.stylex';
import { colorButtonTokens } from '../ColorButton/ColorButton.stylex';

export type ITonalColorPickerContentStylesKey =
  keyof typeof basicTemplateStyles;
export const basicTemplateStyles = stylex.create({
  host: {
    width: 'min-content',
  },
  inner: {
    padding: 8,
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
