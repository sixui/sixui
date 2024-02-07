import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';
import React from 'react';
import stylex from '@stylexjs/stylex';

export interface IColorBoxProps {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor: string | StyleXVar<string>;
  textColor: string | StyleXVar<string>;
}

const styles = stylex.create({
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

export const ColorBox: React.FC<IColorBoxProps> = ({
  label,
  size = 'md',
  backgroundColor,
  textColor,
}) => (
  <div
    {...stylex.props(
      styles.host,
      styles[`height$${size}`],
      styles.color(backgroundColor, textColor),
    )}
  >
    {label}
  </div>
);
