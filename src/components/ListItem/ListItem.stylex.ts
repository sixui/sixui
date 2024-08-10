import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

const MIN_DENSITY = -4;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list-item.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss

const vars = {
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  topSpace$sm: `calc(${spacingTokens.padding$1} + ${DENSITY})`,
  bottomSpace$sm: `calc(${spacingTokens.padding$1} + ${DENSITY})`,
  topSpace$md: `calc(${spacingTokens.padding$2} + ${DENSITY})`,
  bottomSpace$md: `calc(${spacingTokens.padding$2} + ${DENSITY})`,
  topSpace$lg: `calc(${spacingTokens.padding$2} + ${DENSITY})`,
  bottomSpace$lg: `calc(${spacingTokens.padding$2} + ${DENSITY})`,
  topSpace$xl: `calc(${spacingTokens.padding$3} + ${DENSITY})`,
  bottomSpace$xl: `calc(${spacingTokens.padding$3} + ${DENSITY})`,

  // container
  containerColor: 'unset',
  containerOpacity: '1',
  containerShape: shapeTokens.corner$none,
  containerMinHeight$sm: `calc(48px * ${scaleTokens.scale} + ${DENSITY})`,
  containerMinHeight$md: `calc(56px * ${scaleTokens.scale} + ${DENSITY})`,
  containerMinHeight$lg: `calc(72px * ${scaleTokens.scale} + ${DENSITY})`,
  containerMinHeight$xl: `calc(80px * ${scaleTokens.scale} + ${DENSITY})`,
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
  leadingIconSize: `calc(18px * ${scaleTokens.scale})`,
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
  trailingIconSize: `calc(18px * ${scaleTokens.scale})`,
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
  imageWidth: `calc(56px * ${scaleTokens.scale} + ${DENSITY})`,
  imageHeight: `calc(56px * ${scaleTokens.scale} + ${DENSITY})`,

  // video
  videoHeight: `calc(64px * ${scaleTokens.scale} + ${DENSITY})`,
};

export const listItemTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const listItemTheme = stylex.createTheme(listItemTokens, vars);
