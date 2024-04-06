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
  host: {
    position: 'relative',
    flexGrow: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  separator: {
    position: 'absolute',
    top: 'calc((24px + 8px * 2) / 2)',
    left: 'calc(-50% + 12px)',
    right: 'calc(50% + 12px)',
  },
  button: {
    borderRadius: shapeVars.corner$full,
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
  buttonInner$labelRight: {
    flexDirection: 'row',
  },
  buttonInner$labelBottom: {
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
    color: colorRolesVars.primary,
    fontSize: 24,
  },
  stepIndex$icon$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  stepIndex$icon$error: {
    color: colorRolesVars.error,
  },
  stepIndex$text: {
    borderRadius: shapeVars.corner$full,
    backgroundColor: colorRolesVars.primary,
    color: colorRolesVars.onPrimary,

    fontFamily: typescaleVars.labelFont$md,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelLetterSpacing$md,
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
    color: colorRolesVars.onSurface,
  },
  labelContainer$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  labelContainer$error: {
    color: colorRolesVars.onErrorContainer,
  },
  labelContainer$right: {
    alignItems: 'flex-start',
  },
  labelContainer$bottom: {},
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
  },
});
