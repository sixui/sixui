import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleVarKey } from '@/components/atoms/Button';
import { shapeVars } from '../vars/shape.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IButtonStyleVarKey>> = {
  gap: '8px',

  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-elevated-button.scss#L84C19-L84C19
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-button.scss#L84
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-tonal-button.scss#L84
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-button.scss#L80
  // https://github.com/material-components/material-web/blob/main/tokens/_md-comp-text-button.scss#L73
  leadingSpace: '24px',
  trailingSpace: '24px',
  leadingIconLeadingSpace: '16px',
  leadingIconTrailingSpace: '24px',
  trailingIconLeadingSpace: '24px',
  trailingIconTrailingSpace: '16px',

  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-elevated-button.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-button.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-tonal-button.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-button.scss
  // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-text-button.scss

  // container
  containerHeight: '40px',
  containerShape: shapeVars.corner$full,

  // stateLayer
  // &:hover
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

  // touch
  touchHeight: '48px',

  // label
  labelTextFont: typescaleVars.labelFont$lg,
  labelTextLineHeight: typescaleVars.labelLineHeight$lg,
  labelTextSize: typescaleVars.labelSize$lg,
  labelTextTracking: typescaleVars.labelTracking$lg,
  labelTextWeight: typescaleVars.labelWeight$lg,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,

  // icon
  iconSize: '18px',
  // &:disabled
  iconOpacity$disabled: stateVars.opacity$disabled,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IButtonStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
