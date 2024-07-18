import stylex from '@stylexjs/stylex';

import { shapeTokens } from '@/themes/base/shape.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';

const vars = {
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
  containerColor: 'unset',
  containerElevation: 'unset',
  containerHeight: '40px',
  containerShape: shapeTokens.corner$full,
  // &:disabled
  containerColor$disabled: 'unset',
  containerElevation$disabled: 'unset',
  containerOpacity$disabled: 'unset',
  // &:focus
  containerElevation$focus: 'unset',
  // &:hover
  containerElevation$hover: 'unset',
  // &:pressed
  containerElevation$pressed: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // touch
  touchTargetSpace: '8px',

  // labelText
  labelTextColor: 'inherit',
  labelTextFont: typeScaleTokens.labelFont$lg,
  labelTextLineHeight: typeScaleTokens.labelLineHeight$lg,
  labelTextSize: typeScaleTokens.labelSize$lg,
  labelTextLetterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.labelWeight$lg,
  // &:focus
  labelTextColor$focus: 'inherit',
  // &:hover
  labelTextColor$hover: 'inherit',
  // &:pressed
  labelTextColor$pressed: 'inherit',
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,

  // icon
  iconSize: '18px',
  iconColor: 'inherit',
  // &:focus
  iconColor$focus: 'inherit',
  // &:hover
  iconColor$hover: 'inherit',
  // &:pressed
  iconColor$pressed: 'inherit',
  // &:disabled
  iconColor$disabled: colorSchemeTokens.onSurface,
  iconOpacity$disabled: stateTokens.opacity$disabled,

  // outline
  outlineStyle: 'none',
  outlineWidth: '1px',
  outlineColor: colorSchemeTokens.outline,
  // &:disabled
  outlineColor$disabled: colorSchemeTokens.onSurface,
  outlineOpacity$disabled: stateTokens.outlineOpacity$disabled,
  // &:focus
  outlineColor$focus: colorSchemeTokens.outline,
  // &:pressed
  outlineColor$pressed: colorSchemeTokens.outline,
};

export const buttonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const buttonTheme = stylex.createTheme(buttonTokens, vars);
