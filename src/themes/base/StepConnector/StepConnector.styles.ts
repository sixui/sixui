import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepConnectorStyleKey } from '@/components/atoms/StepConnector';
import { componentVars as stepVars } from '../Step/Step.stylex';
import { componentVars as vars } from './StepConnector.stylex';

type IStepConnectorStyles = IStyles<IStepConnectorStyleKey>;
export const styles: MapNamespaces<IStepConnectorStyles> =
  stylex.create<IStepConnectorStyles>({
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
      marginLeft: `calc(${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2 - ${vars.thickness} / 2)`,
    },
    host$rightLabel: {},
    host$bottomLabel: {
      position: 'absolute',
      top: `calc(${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2 - ${vars.thickness} / 2)`,
      left: `calc(-50% + ${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2)`,
      right: `calc(50% + ${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2)`,
    },
    line: {
      borderColor: vars.color,
      display: 'block',
      flexGrow: 1,
    },
    line$completed: {
      borderColor: vars.color$completed,
    },
    line$horizontal: {
      borderTopStyle: 'solid',
      borderTopWidth: vars.thickness,
      minWidth: vars.minLength$horizontal,
    },
    line$vertical: {
      borderLeftStyle: 'solid',
      borderLeftWidth: vars.thickness,
      minHeight: vars.minLength$vertical,
    },
    text: {
      color: vars.textColor,
      fontFamily: vars.textFont,
      fontSize: vars.textSize,
      fontWeight: vars.textWeight,
      lineHeight: vars.textLineHeight,
      letterSpacing: vars.textLetterSpacing,
    },
    text$completed: {
      color: vars.textColor$completed,
    },
    text$horizontal: {
      paddingLeft: vars.textSpace$horizontal,
      paddingRight: vars.textSpace$horizontal,
    },
    text$vertical: {
      paddingTop: vars.textSpace$vertical,
      paddingBottom: vars.textSpace$vertical,
      transform: `translateX(calc(-50% + ${vars.thickness} / 2))`,
    },
  });
