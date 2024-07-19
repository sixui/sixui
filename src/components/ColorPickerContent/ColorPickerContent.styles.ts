import stylex from '@stylexjs/stylex';

import { shapeTokens } from '@/themes/base/shape.stylex';

export type IColorPickerContentStylesKey = keyof typeof basicTemplateStyles;
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
    borderRadius: shapeTokens.corner$xs,
    width: 40,
    overflow: 'hidden',
  },
});
