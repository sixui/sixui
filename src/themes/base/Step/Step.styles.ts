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
  host$rightLabel: {},
  host$bottomLabel: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    borderRadius: stepStateVars.containerShape,
  },
  container$rightLabel: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [stepStateVars.containerShape]: vars.containerShape$horizontal,
  },
  container$bottomLabel: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [stepStateVars.containerShape]: vars.containerShape$vertical,
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vars.gap,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
  },
  inner$bottomLabel: {
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
  contentConnectorContainer: {
    display: 'flex',
    width: 0,
  },
  contentText: {
    color: vars.contentTextColor,
    fontFamily: vars.contentTextFont,
    fontSize: vars.contentTextSize,
    fontWeight: vars.contentTextWeight,
    lineHeight: vars.contentTextLineHeight,
    letterSpacing: vars.contentTextLetterSpacing,

    paddingLeft: `calc(${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.gap})`, // iconSize + gap
    paddingRight: vars.trailingSpace,
  },
  topConnectorContainer: {
    position: 'absolute',
    display: 'flex',
    zIndex: 999,
    left: 0,
    top: 0,
    bottom: `calc(50% + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
  },
  bottomConnectorContainer: {
    position: 'absolute',
    display: 'flex',
    zIndex: 999,
    left: 0,
    top: `calc(50% + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    bottom: 0,
  },
  connectorContainer: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    position: 'relative',
  },
  connectorContainer$horizontal$rightLabel: {
    flexDirection: 'row',
    position: 'absolute',
    transform: `translateY(calc(-1 * ((${vars.topSpace} + ${vars.bulletPointSize} + ${vars.bottomSpace}) / 2 - (${vars.topSpace} + ${vars.bulletPointSize} / 2))))`,
    left: `calc(-1 * ${vars.trailingSpace} + ${vars.bulletPointSpace})`,
    right: `calc(-1 * ${vars.leadingSpace} + ${vars.bulletPointSpace})`,
  },
  connectorContainer$horizontal$bottomLabel: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: `calc(50% - ((${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.trailingSpace}) / 2 - (${vars.leadingSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
    right: `calc(-50% + ((${vars.leadingSpace} + ${vars.bulletPointSize} + ${vars.trailingSpace}) / 2 - (${vars.leadingSpace} + ${vars.bulletPointSize} / 2)) + ${vars.bulletPointSize} / 2 + ${vars.bulletPointSpace})`,
  },
  connectorContainer$vertical$rightLabel: {
    // position: 'absolute',
    // border: '1px solid red',
    // top: 0,
    // top: `calc(-1 * ${vars.bottomSpace} - ${vars.bulletPointSpace})`,
    // bottom: `calc(-1 * ${vars.topSpace} - ${vars.bulletPointSpace})`,
    // bottom: 0,
  },
  connectorContainer$vertical$bottomLabel: {
    // This style is never applied because the vertical orientation does not
    // support bottom label.
  },
  connectorContainer$vertical$startAtBulletPoint: {
    position: 'absolute',
    top: `calc(-1 * ${vars.bottomSpace} - ${vars.bulletPointSpace})`,
  },
  connectorContainer$vertical$endAtBulletPoint: {
    position: 'absolute',
    bottom: `calc(-1 * ${vars.topSpace} - ${vars.bulletPointSpace})`,
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
