import stylex from '@stylexjs/stylex';

import { stepTokens } from '@/components/Step/Step.stylex';
import { stepConnectorTokens } from './StepConnector.stylex';

export type IStepConnectorStylesKey = keyof typeof stepConnectorStyles;
export const stepConnectorStyles = stylex.create({
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
    marginTop: `calc(-1 * ${stepConnectorTokens.thickness} / 2 + ${stepTokens.topSpace} + ${stepTokens.bulletPointSize} / 2)`,
  },
  host$vertical$rightLabel: {
    flexDirection: 'column',
    marginLeft: `calc(-1 * ${stepConnectorTokens.thickness} / 2 + ${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} / 2)`,
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
    gap: stepConnectorTokens.textSpace$vertical,
    transform: `translateY(calc(-50% + ${stepConnectorTokens.thickness} / 2))`,
  },
  container$horizontal$bottomText: {
    flexDirection: 'column',
    gap: stepConnectorTokens.textSpace$vertical,
    transform: `translateY(calc(50% - ${stepConnectorTokens.thickness} / 2))`,
  },
  container$horizontal$middleText: {
    flexDirection: 'row',
    gap: stepConnectorTokens.textSpace$horizontal,
    alignItems: 'center',
  },
  line: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: stepConnectorTokens.color,
    borderRadius: 'inherit',
  },
  line$completed: {
    backgroundColor: stepConnectorTokens.color$completed,
  },
  line$horizontal: {
    minHeight: stepConnectorTokens.thickness,
  },
  line$vertical: {
    width: stepConnectorTokens.thickness,
  },
  line$horizontal$rightLabel$hasText: {
    marginLeft: `calc(max(8px - ${stepTokens.bulletPointSpace}, 0px))`,
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
    minWidth: stepTokens.connectorMinLength,
  },
  line$vertical$minLength: {
    minHeight: stepTokens.connectorMinLength,
  },
  text: {
    color: stepConnectorTokens.textColor,
    fontFamily: stepConnectorTokens.textFont,
    fontSize: stepConnectorTokens.textSize,
    fontWeight: stepConnectorTokens.textWeight,
    lineHeight: stepConnectorTokens.textLineHeight,
    letterSpacing: stepConnectorTokens.textLetterSpacing,
    textAlign: 'center',
  },
  text$completed: {
    color: stepConnectorTokens.textColor$completed,
  },
  text$horizontal: {
    paddingLeft: stepConnectorTokens.textSpace$horizontal,
    paddingRight: stepConnectorTokens.textSpace$horizontal,
  },
  text$vertical: {
    paddingTop: stepConnectorTokens.textSpace$vertical,
    paddingBottom: stepConnectorTokens.textSpace$vertical,
    transform: `translateX(calc(-50% + ${stepConnectorTokens.thickness} / 2))`,
  },
});
