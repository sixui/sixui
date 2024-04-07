import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepStyleKey } from '@/components/atoms/Step';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Step.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';

type IStepStyles = IStyles<IStepStyleKey>;
export const styles: MapNamespaces<IStepStyles> = stylex.create<IStepStyles>({
  button: {},
  button$horizontal: {
    borderRadius: shapeVars.corner$full,
  },
  button$vertical: {
    borderRadius: shapeVars.corner$md,
  },
  buttonFocusRing: {
    borderRadius: shapeVars.corner$full,
  },
  buttonInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  buttonInner$withText: {
    paddingRight: 12,
  },
  buttonInner$horizontal: {
    flexDirection: 'row',
  },
  buttonInner$vertical: {
    flexDirection: 'column',
  },
  stepIndex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  stepIndex$icon: {
    color: colorRolesVars.secondary,
    fontSize: 24,
  },
  stepIndex$icon$active: {
    color: colorRolesVars.primary,
  },
  stepIndex$icon$completed: {
    color: colorRolesVars.primary,
  },
  stepIndex$icon$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  stepIndex$icon$error: {
    color: colorRolesVars.error,
    fill: 'currentColor',
  },
  stepIndex$text: {
    borderRadius: shapeVars.corner$full,
    backgroundColor: colorRolesVars.secondary,
    color: colorRolesVars.onSecondary,

    fontFamily: typescaleVars.labelFont$md,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelLetterSpacing$md,
  },
  stepIndex$text$active: {
    backgroundColor: colorRolesVars.primary,
    color: colorRolesVars.onPrimary,
  },
  stepIndex$text$completed: {
    backgroundColor: colorRolesVars.primary,
    color: colorRolesVars.onPrimary,
  },
  stepIndex$text$disabled: {
    backgroundColor: colorRolesVars.onSurface,
    color: colorRolesVars.surface,
    opacity: stateVars.opacity$disabled,
  },
  stepIndex$text$error: {
    backgroundColor: colorRolesVars.errorContainer,
    color: colorRolesVars.onErrorContainer,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: colorRolesVars.secondary,
  },
  labelContainer$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  labelContainer$active: {
    color: colorRolesVars.onSurface,
  },
  labelContainer$completed: {
    color: colorRolesVars.onSurface,
  },
  labelContainer$error: {
    color: colorRolesVars.error,
  },
  labelContainer$horizontal: {
    alignItems: 'flex-start',
  },
  labelContainer$vertical: {},
  label: {
    fontFamily: typescaleVars.labelFont$lg,
    fontSize: typescaleVars.labelSize$lg,
    fontWeight: typescaleVars.labelWeight$lg,
    lineHeight: typescaleVars.labelLineHeight$lg,
    letterSpacing: typescaleVars.labelLetterSpacing$lg,
  },
  supportingText: {
    fontFamily: typescaleVars.labelFont$sm,
    fontSize: typescaleVars.labelSize$sm,
    fontWeight: typescaleVars.labelWeight$sm,
    lineHeight: typescaleVars.labelLineHeight$sm,
    letterSpacing: typescaleVars.labelLetterSpacing$sm,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: shapeVars.corner$full,
    // FIXME: adapt corner to layout
  },
});
