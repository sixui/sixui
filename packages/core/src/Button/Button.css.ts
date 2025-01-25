import { style } from '@vanilla-extract/css';

export const buttonClassNames = {
  root: style({
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'blue',
    borderRadius: 4,
    height: 40,
    minWidth: 80,
    paddingLeft: 16,
    paddingRight: 16,
  }),
};
