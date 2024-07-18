import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { stateTokens } from '@/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list-item.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss

const vars = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace$sm: '4px',
  bottomSpace$sm: '4px',
  topSpace$md: '8px',
  bottomSpace$md: '8px',
  topSpace$lg: '8px',
  bottomSpace$lg: '8px',
  topSpace$xl: '12px',
  bottomSpace$xl: '12px',

  // container
  containerColor: 'unset',
  containerOpacity: '1',
  containerShape: shapeTokens.corner$none,
  containerMinHeight$sm: '48px',
  containerMinHeight$md: '56px',
  containerMinHeight$lg: '72px',
  containerMinHeight$xl: '80px',
  // &:disabled
  containerColor$disabled: 'transparent',
  containerOpacity$disabled: stateTokens.containerOpacity$disabled,

  // selectedContainer
  selectedContainerColor: 'unset',
  selectedContainerOpacity: 'unset',

  // text
  textColor: 'inherit',
  // &:hover
  textColor$hover: 'inherit',
  // &:focus
  textColor$focus: 'inherit',
  // &:pressed
  textColor$pressed: 'inherit',
  // &:disabled
  textColor$disabled: colorSchemeTokens.onSurface,
  textOpacity$disabled: stateTokens.opacity$disabled,

  // nonText
  nonTextColor: 'inherit',
  // &:hover
  nonTextColor$hover: 'inherit',
  // &:focus
  nonTextColor$focus: 'inherit',
  // &:pressed
  nonTextColor$pressed: 'inherit',
  // &:disabled
  nonTextColor$disabled: colorSchemeTokens.onSurfaceVariant,
  nonTextOpacity$disabled: stateTokens.opacity$disabled,

  // selectedText
  selectedTextColor: 'inherit',
  // &:hover
  selectedTextColor$hover: 'inherit',
  // &:focus
  selectedTextColor$focus: 'inherit',
  // &:pressed
  selectedTextColor$pressed: 'inherit',

  // selectedNonText
  selectedNonTextColor: 'inherit',
  // &:hover
  selectedNonTextColor$hover: 'inherit',
  // &:focus
  selectedNonTextColor$focus: 'inherit',
  // &:pressed
  selectedNonTextColor$pressed: 'inherit',

  // leadingIcon
  leadingIconColor: 'inherit',
  // &:hover
  leadingIconColor$hover: 'inherit',
  // &:focus
  leadingIconColor$focus: 'inherit',
  // &:pressed
  leadingIconColor$pressed: 'inherit',
  leadingIconSize: '18px',
  // &:disabled
  leadingIconColor$disabled: colorSchemeTokens.onSurface,
  leadingIconOpacity$disabled: stateTokens.opacity$disabled,

  // selectedLeadingIcon
  selectedLeadingIconColor: 'inherit',
  // &:hover
  selectedLeadingIconColor$hover: 'inherit',
  // &:focus
  selectedLeadingIconColor$focus: 'inherit',
  // &:pressed
  selectedLeadingIconColor$pressed: 'inherit',

  // trailingIcon
  trailingIconColor: 'inherit',
  trailingIconSize: '18px',
  // &:hover
  trailingIconColor$hover: 'inherit',
  // &:focus
  trailingIconColor$focus: 'inherit',
  // &:pressed
  trailingIconColor$pressed: 'inherit',
  // &:disabled
  trailingIconColor$disabled: colorSchemeTokens.onSurface,
  trailingIconOpacity$disabled: stateTokens.opacity$disabled,

  // selectedTrailingIcon
  selectedTrailingIconColor: 'inherit',
  // &:hover
  selectedTrailingIconColor$hover: 'inherit',
  // &:focus
  selectedTrailingIconColor$focus: 'inherit',
  // &:pressed
  selectedTrailingIconColor$pressed: 'inherit',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,

  // image
  imageWidth: '56px',
  imageHeight: '56px',

  // video
  videoHeight: '64px',
};

export const listItemTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const listItemTheme = stylex.createTheme(listItemTokens, vars);
