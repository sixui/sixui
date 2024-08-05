import stylex from '@stylexjs/stylex';

export type ICopyableTextStylesKey = keyof typeof copyableTextStyles;
export const copyableTextStyles = stylex.create({
  inner: {
    display: 'inline-flex',
    gap: '0.375em',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
  },
  icon: {
    width: '1rem',
    height: '1rem',
  },
});
