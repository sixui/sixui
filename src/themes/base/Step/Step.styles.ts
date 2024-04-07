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
  host: {},
  host$rightLabel: {},
  host$bottomLabel: {
    position: 'relative',
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
    alignItems: 'center',
    gap: vars.gap,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
  },
  inner$rightLabel: {
    flexDirection: 'row',
  },
  inner$bottomLabel: {
    flexDirection: 'column',
  },
  bulletPoint: {
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
    alignItems: 'center',
  },
  labelContainer$rightLabel: {
    alignItems: 'flex-start',
  },
  labelContainer$bottomLabel: {},
  label: {
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
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
    position: 'absolute',
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
