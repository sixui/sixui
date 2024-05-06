import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepStyleKey } from '@/components/atoms/Step';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Step.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
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

    // eslint-disable-next-line @stylexjs/valid-styles
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: vars.bulletPointSize,
    height: vars.bulletPointSize,
  },
  bulletPoint$icon: {
    color: vars.bulletPointColor,
    fontSize: vars.bulletPointSize,
    width: vars.bulletPointSize,
    height: vars.bulletPointSize,
  },
  bulletPoint$icon$active: {
    color: vars.bulletPointColor$active,
  },
  bulletPoint$icon$completed: {
    color: vars.bulletPointColor$completed,
  },
  bulletPoint$icon$disabled: {
    color: vars.bulletPointColor$disabled,
    opacity: vars.bulletPointOpacity$disabled,
  },
  bulletPoint$icon$error: {
    color: vars.bulletPointColor$error,
    fill: 'currentColor',
  },
  bulletPoint$text: {
    borderRadius: vars.bulletPointShape,
    backgroundColor: vars.bulletPointColor,
    color: vars.bulletPointTextColor,

    fontFamily: vars.bulletPointTextFont,
    fontSize: vars.bulletPointTextSize,
    fontWeight: vars.bulletPointTextWeight,
    lineHeight: vars.bulletPointTextLineHeight,
    letterSpacing: vars.bulletPointTextLetterSpacing,
  },
  bulletPoint$text$active: {
    backgroundColor: vars.bulletPointColor$active,
    color: vars.bulletPointTextColor$active,
  },
  bulletPoint$text$completed: {
    backgroundColor: vars.bulletPointColor$completed,
    color: vars.bulletPointTextColor$completed,
  },
  bulletPoint$text$disabled: {
    backgroundColor: vars.bulletPointColor$disabled,
    color: vars.bulletPointTextColor$disabled,
    opacity: vars.bulletPointOpacity$disabled,
  },
  bulletPoint$text$error: {
    backgroundColor: vars.bulletPointColor$error,
    color: vars.bulletPointTextColor$error,
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
  label$active: {
    color: vars.labelTextColor$active,
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
  supportingText$active: {
    color: vars.supportingTextColor$active,
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
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: stepStateVars.containerShape,
  },
});
