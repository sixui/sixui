import stylex from '@stylexjs/stylex';

import { circularProgressIndicatorTokens } from '~/components/CircularProgressIndicator/CircularProgressIndicator.stylex';
import { focusRingTokens } from '~/components/FocusRing/FocusRing.stylex';
import { stepTokens } from './Step.stylex';
import { stepStateTokens } from './Step.state.stylex';

export type IStepStylesKey = keyof typeof stepStyles;
export const stepStyles = stylex.create({
  host: {
    position: 'relative',
  },
  host$bottomLabel: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: `calc(${stepTokens.topSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.bottomSpace} + 2 * ${stepTokens.bulletPointSpace})`,
  },
  buttonContainer$bottomLabel: {
    flexDirection: 'column',
  },
  button: {
    borderRadius: stepStateTokens.containerShape,
    paddingLeft: stepTokens.leadingSpace,
    paddingRight: stepTokens.trailingSpace,
    paddingTop: stepTokens.topSpace,
    paddingBottom: stepTokens.bottomSpace,

    [stepStateTokens.containerShape]: stepTokens.containerShape,
  },
  buttonInner: {
    display: 'flex',
    alignItems: 'center',
    gap: stepTokens.gap,
  },
  buttonInner$rightLabel: {
    flexDirection: 'row',
  },
  buttonInner$bottomLabel: {
    flexDirection: 'column',
  },
  bulletPoint: {
    position: 'relative',
    flexShrink: 0,
    width: stepTokens.bulletPointSize,
    height: stepTokens.bulletPointSize,
  },
  bulletPoint$container: {
    borderRadius: stepTokens.bulletPointShape,
  },
  icon: {
    fontSize: stepTokens.bulletPointSize,
    fill: 'currentColor',
    [stepStateTokens.iconColor]: stepTokens.bulletPointColor,
    color: stepStateTokens.iconColor,
  },
  icon$disabled: {
    [stepStateTokens.iconColor]: stepTokens.bulletPointColor$disabled,
    opacity: stepTokens.bulletPointOpacity$disabled,
  },
  icon$error: {
    [stepStateTokens.iconColor]: stepTokens.bulletPointColor$error,
  },
  icon$inactive: {
    [stepStateTokens.iconColor]: stepTokens.bulletPointColor$inactive,
    opacity: stepTokens.bulletPointOpacity$inactive,
  },
  icon$completed: {
    [stepStateTokens.iconColor]: stepTokens.bulletPointColor$completed,
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: stepTokens.bulletPointColor,
  },
  background$disabled: {
    backgroundColor: stepTokens.bulletPointColor$disabled,
    opacity: stepTokens.bulletPointOpacity$disabled,
  },
  background$error: {
    backgroundColor: stepTokens.bulletPointColor$error,
  },
  background$inactive: {
    backgroundColor: stepTokens.bulletPointColor$inactive,
    opacity: stepTokens.bulletPointOpacity$inactive,
  },
  background$completed: {
    backgroundColor: stepTokens.bulletPointColor$completed,
  },
  text: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: stepTokens.bulletPointTextColor,

    fontFamily: stepTokens.bulletPointTextFont,
    fontSize: stepTokens.bulletPointTextSize,
    fontWeight: stepTokens.bulletPointTextWeight,
    lineHeight: stepTokens.bulletPointTextLineHeight,
    letterSpacing: stepTokens.bulletPointTextLetterSpacing,
  },
  text$disabled: {
    color: stepTokens.bulletPointTextColor$disabled,
    opacity: stepTokens.bulletPointTextOpacity$disabled,
  },
  text$error: {
    color: stepTokens.bulletPointTextColor$error,
  },
  text$inactive: {
    color: stepTokens.bulletPointTextColor$inactive,
  },
  text$completed: {
    color: stepTokens.bulletPointTextColor$completed,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  labelContainer$rightLabel: { alignItems: 'start' },
  labelContainer$bottomLabel: { alignItems: 'center' },
  label: {
    color: stepTokens.labelTextColor,
    fontFamily: stepTokens.labelTextFont,
    fontSize: stepTokens.labelTextSize,
    fontWeight: stepTokens.labelTextWeight,
    lineHeight: stepTokens.labelTextLineHeight,
    letterSpacing: stepTokens.labelTextLetterSpacing,
  },
  label$interactive: {
    color: stepTokens.labelTextColor$interactive,
  },
  label$inactive: {
    color: stepTokens.labelTextColor$inactive,
  },
  label$completed: {
    color: stepTokens.labelTextColor$completed,
  },
  label$error: {
    color: stepTokens.labelTextColor$error,
  },
  label$disabled: {
    color: stepTokens.labelTextColor$disabled,
    opacity: stepTokens.labelTextOpacity$disabled,
  },
  supportingText: {
    color: stepTokens.supportingTextColor,
    fontFamily: stepTokens.supportingTextFont,
    fontSize: stepTokens.supportingTextSize,
    fontWeight: stepTokens.supportingTextWeight,
    lineHeight: stepTokens.supportingTextLineHeight,
    letterSpacing: stepTokens.supportingTextLetterSpacing,
  },
  supportingText$interactive: {
    color: stepTokens.supportingTextColor,
  },
  supportingText$inactive: {
    color: stepTokens.supportingTextColor$inactive,
  },
  supportingText$completed: {
    color: stepTokens.supportingTextColor$completed,
  },
  supportingText$error: {
    color: stepTokens.supportingTextColor$error,
  },
  supportingText$disabled: {
    color: stepTokens.supportingTextColor$disabled,
    opacity: stepTokens.supportingTextOpacity$disabled,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentText: {
    color: stepTokens.contentTextColor,
    fontFamily: stepTokens.contentTextFont,
    fontSize: stepTokens.contentTextSize,
    fontWeight: stepTokens.contentTextWeight,
    lineHeight: stepTokens.contentTextLineHeight,
    letterSpacing: stepTokens.contentTextLetterSpacing,

    paddingLeft: `calc(${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.gap})`,
    paddingRight: stepTokens.trailingSpace,
  },
  extensibleConnectorContainer: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    flexShrink: 0,
  },
  extensibleConnectorContainer$vertical: {
    alignItems: 'stretch',
    minHeight: stepTokens.connectorMinLength,
  },
  extensibleConnectorContainer$horizontal: {
    alignItems: 'center',
    minWidth: stepTokens.connectorMinLength,
  },
  connectorContainer: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    position: 'relative',
    borderRadius: 'inherit',
  },
  connectorContainer$top: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: 0,
    bottom: `calc(50% + ((${stepTokens.topSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.bottomSpace}) / 2 - (${stepTokens.topSpace} + ${stepTokens.bulletPointSize} / 2)) + ${stepTokens.bulletPointSize} / 2 + ${stepTokens.bulletPointSpace})`,
    borderBottomLeftRadius: stepTokens.connectorShape,
    borderBottomRightRadius: stepTokens.connectorShape,
  },
  connectorContainer$bottom: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: `calc(50% - ((${stepTokens.topSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.bottomSpace}) / 2 - (${stepTokens.topSpace} + ${stepTokens.bulletPointSize} / 2)) + ${stepTokens.bulletPointSize} / 2 + ${stepTokens.bulletPointSpace})`,
    bottom: 0,
    borderTopLeftRadius: stepTokens.connectorShape,
    borderTopRightRadius: stepTokens.connectorShape,
  },
  connectorContainer$content: {
    display: 'flex',
    width: 0,
    flexGrow: 0,
  },
  connectorContainer$horizontal$rightLabel: {
    flexDirection: 'row',
    transform: `translateY(calc(-1 * ((${stepTokens.topSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.bottomSpace}) / 2 - (${stepTokens.topSpace} + ${stepTokens.bulletPointSize} / 2))))`,
    position: 'relative',
    marginLeft: `calc(-1 * ${stepTokens.trailingSpace} + ${stepTokens.bulletPointSpace})`,
    marginRight: `calc(-1 * ${stepTokens.leadingSpace} + ${stepTokens.bulletPointSpace})`,
    borderRadius: stepTokens.connectorShape,
  },
  connectorContainer$horizontal$bottomLabel: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: `calc(50% - ((${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.trailingSpace}) / 2 - (${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} / 2)) + ${stepTokens.bulletPointSize} / 2 + ${stepTokens.bulletPointSpace})`,
    right: `calc(-50% + ((${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} + ${stepTokens.trailingSpace}) / 2 - (${stepTokens.leadingSpace} + ${stepTokens.bulletPointSize} / 2)) + ${stepTokens.bulletPointSize} / 2 + ${stepTokens.bulletPointSpace})`,
    borderRadius: stepTokens.connectorShape,
  },
});

export const stepFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: stepStateTokens.containerShape,
  },
});

export const stepCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: stepStateTokens.iconColor,
  },
});
