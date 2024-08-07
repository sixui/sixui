import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '../FieldBase/FieldBase.stylex';

export type IFieldStylesKey = keyof typeof fieldStyles;
export const fieldStyles = stylex.create({
  placeholder: {
    WebkitTextFillColor: fieldBaseTokens.contentPlaceholderColor,
    color: fieldBaseTokens.contentPlaceholderColor,
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
