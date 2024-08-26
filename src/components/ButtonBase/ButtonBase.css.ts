import { style } from '@vanilla-extract/css';

import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

export type IButtonBaseClassName = keyof typeof buttonbaseStyles;

const root = style({
  display: 'inline-flex',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  selectors: {
    [getModifierSelector('disabled')]: {
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
});

export const buttonbaseStyles = {
  root,
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    selectors: {
      [getModifierSelector('disabled', root)]: {
        cursor: 'default',
        pointerEvents: 'none',

        // FIXME:
        backgroundColor: 'red',
        border: '2px solid red',
      },
    },
  },
  outline: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
};
