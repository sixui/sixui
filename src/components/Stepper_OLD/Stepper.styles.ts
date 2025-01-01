import stylex from '@stylexjs/stylex';

export type IStepperStylesKey = keyof typeof stepperStyles;
export const stepperStyles = stylex.create({
  host: {
    display: 'flex',
    flexGrow: 1,
  },
  host$horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  host$vertical: {
    flexDirection: 'column',
  },
  host$labelBottom: {
    alignItems: 'flex-start',
  },
});
