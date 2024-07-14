import stylex from '@stylexjs/stylex';

import { componentVars as vars } from '@/themes/base/FieldBase/FieldBase.stylex';

export type IFieldStylesKey = keyof typeof fieldStyles;
export const fieldStyles = stylex.create({
  placeholder: {
    WebkitTextFillColor: vars.contentPlaceholderColor,
    color: vars.contentPlaceholderColor,
    opacity: 1,
  },
  placeholder$disabled: {
    WebkitTextFillColor: 'currentColor',
    color: 'currentColor',
  },
  value: {
    color: 'inherit',
    display: 'flex',
    flexGrow: 1,
  },
});
