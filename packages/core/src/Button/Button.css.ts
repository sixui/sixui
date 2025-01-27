import { createVar, style } from '@vanilla-extract/css';

export const buttonVars = {
  container: {
    color: createVar(),
  },
};

export const buttonClassNames = {
  root: style({
    vars: {
      [buttonVars.container.color]: 'blue',
    },

    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: buttonVars.container.color,
    borderRadius: 4,
    height: 40,
    minWidth: 80,
    paddingLeft: 16,
    paddingRight: 16,
  }),
};
