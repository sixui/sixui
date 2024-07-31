import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '~/components/FieldBase/FieldBase.stylex';

export const playgroundOptionFieldBaseStyles = stylex.create({
  host: {
    [fieldBaseTokens.containerHeight]: '38px',
    [fieldBaseTokens.leadingSpace]: '12px',
    [fieldBaseTokens.trailingSpace]: '12px',
    [fieldBaseTokens.topSpace]: '8px',
    [fieldBaseTokens.bottomSpace]: '8px',
  },
});
