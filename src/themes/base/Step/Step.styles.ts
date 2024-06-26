import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepStyleKey } from '@/components/atoms/Step';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './Step.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';
import { componentVars as stepStateVars } from './Step.states.stylex';

type IStepStyles = IStyles<IStepStyleKey>;
export const styles: MapNamespaces<IStepStyles> = stylex.create<IStepStyles>({
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
    minHeight: `calc(${vars.topSpace} + ${vars.bulletPointSize} + ${vars.bottomSpace} + 2 * ${vars.bulletPointSpace})`,
  },
  buttonContainer$bottomLabel: {
    flexDirection: 'column',
  },
  button: {
    borderRadius: stepStateVars.containerShape,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,

    [stepStateVars.containerShape]: vars.containerShape,
  },
  buttonInner: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.gap,
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
    width: vars.bulletPointSize,
    height: vars.bulletPointSize,
  },
  bulletPoint$container: {
    borderRadius: vars.bulletPointShape,
  },
  icon: {
    fontSize: vars.bulletPointSize,
    fill: 'currentColor',
    [stepStateVars.iconColor]: vars.bulletPointColor,
    color: stepStateVars.iconColor,
  },
  icon$disabled: {
    [stepStateVars.iconColor]: vars.bulletPointColor$disabled,
    opacity: vars.bulletPointOpacity$disabled,
  },
  icon$error: {
    [stepStateVars.iconColor]: vars.bulletPointColor$error,
  },
  icon$inactive: {
    [stepStateVars.iconColor]: vars.bulletPointColor$inactive,
    opacity: vars.bulletPointOpacity$inactive,
  },
  icon$completed: {
    [stepStateVars.iconColor]: vars.bulletPointColor$completed,
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: vars.bulletPointColor,
  },
  background$disabled: {
    backgroundColor: vars.bulletPointColor$disabled,
    opacity: vars.bulletPointOpacity$disabled,
  },
  background$error: {
    backgroundColor: vars.bulletPointColor$error,
  },
  background$inactive: {
    backgroundColor: vars.bulletPointColor$inactive,
    opacity: vars.bulletPointOpacity$inactive,
  },
  background$completed: {
    backgroundColor: vars.bulletPointColor$completed,
  },
  text: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.bulletPointTextColor,

    fontFamily: vars.bulletPointTextFont,
    fontSize: vars.bulletPointTextSize,
    fontWeight: vars.bulletPointTextWeight,
    lineHeight: vars.bulletPointTextLineHeight,
    letterSpacing: vars.bulletPointTextLetterSpacing,
  },
  text$disabled: {
    color: vars.bulletPointTextColor$disabled,
    opacity: vars.bulletPointTextOpacity$disabled,
  },
  text$error: {
    color: vars.bulletPointTextColor$error,
  },
  text$inactive: {
    color: vars.bulletPointTextColor$inactive,
  },
  text$completed: {
    color: vars.bulletPointTextColor$completed,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  labelContainer$rightLabel: { alignItems: 'start' },
  labelContainer$bottomLabel: { alignItems: 'center' },
  label: {
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
  },
  label$interactive: {
    color: vars.labelTextColor$interactive,
  },
  label$inactive: {
    color: vars.labelTextColor$inactive,
  },
  label$completed: {
    color: vars.labelTextColor$completed,
  },
  label$error: {
    color: vars.labelTextColor$error,
  },
  label$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
  },
  supportingText: {
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextFont,
    fontSize: vars.supportingTextSize,
    fontWeight: vars.supportingTextWeight,
    lineHeight: vars.supportingTextLineHeight,
    letterSpacing: vars.supportingTextLetterSpacing,
  },
  supportingText$interactive: {
    color: vars.supportingTextColor,
  },
  supportingText$inactive: {
    color: vars.supportingTextColor$inactive,
  },
  supportingText$completed: {
    color: vars.supportingTextColor$completed,
  },
  supportingText$error: {
    color: vars.supportingTextColor$error,
  },
  supportingText$disabled: {
    color: vars.supportingTextColor$disabled,
    opacity: vars.supportingTextOpacity$disabled,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentText: {
    color: vars.contentTextColor,
    fontFamily: vars.contentTextFont,
    fontSize: vars.contentTextSize,
    fontWeight: vars.contentTextWeight,
    lineHeight: vars.contentTextLineHeight,
    letterSpacing: vars.contentTextLetterSpacing,

    paddingLeft: `calc(${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.gap})`,
    paddingRight: vars.trailingSpace,
  },
  extensibleConnectorContainer: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    flexShrink: 0,
  },
  extensibleConnectorContainer$vertical: {
    alignItems: 'stretch',
    minHeight: vars.connectorMinLength,
  },
  extensibleConnectorContainer$horizontal: {
    alignItems: 'center',
    minWidth: vars.connectorMinLength,
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
    bottom: `calc(50% + ((${vars.topSpace} + ${vars.bulletPointSize} + ${vars.bottomSpace}) / 2 - (${vars.topSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    borderBottomLeftRadius: vars.connectorShape,
    borderBottomRightRadius: vars.connectorShape,
  },
  connectorContainer$bottom: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: `calc(50% - ((${vars.topSpace} + ${vars.bulletPointSize} + ${vars.bottomSpace}) / 2 - (${vars.topSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    bottom: 0,
    borderTopLeftRadius: vars.connectorShape,
    borderTopRightRadius: vars.connectorShape,
  },
  connectorContainer$content: {
    display: 'flex',
    width: 0,
    flexGrow: 0,
  },
  connectorContainer$horizontal$rightLabel: {
    flexDirection: 'row',
    transform: `translateY(calc(-1 * ((${vars.topSpace} + ${vars.bulletPointSize} + ${vars.bottomSpace}) / 2 - (${vars.topSpace} + ${vars.bulletPointSize} / 2))))`,
    position: 'relative',
    marginLeft: `calc(-1 * ${vars.trailingSpace} + ${vars.bulletPointSpace})`,
    marginRight: `calc(-1 * ${vars.leadingSpace} + ${vars.bulletPointSpace})`,
    borderRadius: vars.connectorShape,
  },
  connectorContainer$horizontal$bottomLabel: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: `calc(50% - ((${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.trailingSpace}) / 2 - (${vars.leadingSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    right: `calc(-50% + ((${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.trailingSpace}) / 2 - (${vars.leadingSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    borderRadius: vars.connectorShape,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    [focusRingVars.shape]: stepStateVars.containerShape,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      [circularProgressIndicatorVars.color]: stepStateVars.iconColor,
    },
  });
