import stylex from '@stylexjs/stylex';

export type ICopyableTextStylesKey = keyof typeof copyableTextStyles;
export const copyableTextStyles = stylex.create({
  host: {
    display: 'inline-flex',
    gap: '0.375em',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
  },
});
