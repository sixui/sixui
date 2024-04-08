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
      position: 'relative',
    },
    host$horizontal: {
      alignItems: 'center',
    },
    host$vertical: {
      flexDirection: 'column',
      marginLeft: `calc(${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2 - ${vars.thickness} / 2)`,
    },
    host$bottomLabel: {
      position: 'absolute',
      top: `calc(${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2 - ${vars.thickness} / 2)`,
      left: `calc(50% + ${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2)`,
      right: `calc(-50% + ${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2)`,
    },
    host$rightLabel: {},
    container$horizontal: {
      display: 'flex',
      flexGrow: 1,
    },
    container$horizontal$topText: {
      flexDirection: 'column',
      gap: vars.textSpace$vertical,
    },
    container$horizontal$bottomText: {
      flexDirection: 'column',
      gap: vars.textSpace$vertical,
    },
    container$horizontal$middleText: {
      flexDirection: 'row',
      gap: vars.textSpace$horizontal,
      alignItems: 'center',
    },
    line: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: vars.color,
      borderRadius: vars.shape,
    },
    line$completed: {
      backgroundColor: vars.color$completed,
    },
    line$horizontal: {
      minWidth: vars.minLength$horizontal,
      height: vars.thickness,
    },
    line$vertical: {
      minHeight: vars.minLength$vertical,
      width: vars.thickness,
    },
    line$hasContent$horizontal: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    line$hasContent$vertical: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    text: {
      color: vars.textColor,
      fontFamily: vars.textFont,
      fontSize: vars.textSize,
      fontWeight: vars.textWeight,
      lineHeight: vars.textLineHeight,
      letterSpacing: vars.textLetterSpacing,
      textAlign: 'center',
    },
    text$completed: {
      color: vars.textColor$completed,
    },
    text$horizontal: {},
    text$vertical: {
      paddingTop: vars.textSpace$vertical,
      paddingBottom: vars.textSpace$vertical,
      transform: `translateX(calc(-50% + ${vars.thickness} / 2))`,
    },
  });
