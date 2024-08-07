import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

export const colorRoleStyles = stylex.create({
  host: {
    flexGrow: 1,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  height$xs: { flexBasis: '30px' },
  height$sm: { flexBasis: '40px' },
  height$md: { flexBasis: '50px' },
  height$lg: { flexBasis: '65px' },
  height$xl: { flexBasis: '75px' },
  color: (
    bg: string | StyleXVar<string>,
    text: string | StyleXVar<string>,
  ) => ({
    backgroundColor: bg,
    color: text,
  }),
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    backgroundColor: 'unset',
  },
});
