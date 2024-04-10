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
      borderRadius: 'inherit',
    },
    host$horizontal$rightLabel: {
      flexDirection: 'row',
    },
    host$horizontal$bottomLabel: {
      flexDirection: 'row',
      marginTop: `calc(-1 * ${vars.thickness} / 2 + ${stepVars.topSpace} + ${stepVars.bulletPointSize} / 2)`,
    },
    host$vertical$rightLabel: {
      flexDirection: 'column',
      marginLeft: `calc(-1 * ${vars.thickness} / 2 + ${stepVars.leadingSpace} + ${stepVars.bulletPointSize} / 2)`,
    },
    host$vertical$bottomLabel: {
      // This style is never applied because the vertical orientation does not
      // support bottom label.
    },
    container: {
      borderRadius: 'inherit',
    },
    container$horizontal: {
      display: 'flex',
      flexGrow: 1,
    },
    container$vertical: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    container$horizontal$topText: {
      flexDirection: 'column',
      gap: vars.textSpace$vertical,
      transform: `translateY(calc(-50% + ${vars.thickness} / 2))`,
    },
    container$horizontal$bottomText: {
      flexDirection: 'column',
      gap: vars.textSpace$vertical,
      transform: `translateY(calc(50% - ${vars.thickness} / 2))`,
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
      borderRadius: 'inherit',
    },
    line$completed: {
      backgroundColor: vars.color$completed,
    },
    line$horizontal: {
      minHeight: vars.thickness,
    },
    line$vertical: {
      width: vars.thickness,
    },
    line$horizontal$rightLabel$hasText: {
      marginLeft: `calc(max(8px - ${stepVars.bulletPointSpace}, 0px))`,
    },
    line$horizontal$cutStart: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    line$horizontal$cutEnd: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    line$vertical$cutStart: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    line$vertical$cutEnd: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    line$horizontal$minLength: {
      minWidth: stepVars.connectorMinLength,
    },
    line$vertical$minLength: {
      minHeight: stepVars.connectorMinLength,
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
