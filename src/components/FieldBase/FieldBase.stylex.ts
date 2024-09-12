import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-text-field.scss

const MIN_DENSITY = -2;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,
  topSpace: spacingTokens.padding$3,
  topSpace$withLabel: spacingTokens.padding$2,
  bottomSpace: spacingTokens.padding$3,
  bottomSpace$withLabel: spacingTokens.padding$2,

  // container
  containerShape: 'unset',
  containerColor: 'inherit',
  containerMinHeight: `calc(56px * ${scaleTokens.scale} + ${DENSITY})`,
  // &:disabled
  containerColor$disabled: 'inherit',
  containerOpacity$disabled: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: 'inherit',
  stateLayerOpacity$pressed: stateTokens.stateLayerOpacity$pressed,
  // &:error
  stateLayerColor$error$hover: 'inherit',
  stateLayerOpacity$error$hover: 'unset',

  // content
  contentColor: colorSchemeTokens.onSurface,
  contentColor$selection: colorSchemeTokens.onSurface,
  contentBackground$selection: colorSchemeTokens.inversePrimary,
  contentFont: typeScaleTokens.bodyFont$lg,
  contentSize: typeScaleTokens.bodySize$lg,
  contentLineHeight: typeScaleTokens.bodyLineHeight$lg,
  contentLetterSpacing: typeScaleTokens.bodyLetterSpacing$lg,
  contentWeight: typeScaleTokens.bodyWeight$lg,
  contentPlaceholderColor: colorSchemeTokens.onSurfaceVariant,
  contentPrefixColor: colorSchemeTokens.onSurfaceVariant,
  contentPrefixTrailingSpace: spacingTokens.padding$1,
  contentSuffixColor: colorSchemeTokens.onSurfaceVariant,
  contentSuffixLeadingSpace: spacingTokens.padding$1,
  // &:disabled
  contentColor$disabled: colorSchemeTokens.onSurface,
  contentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  contentColor$focus: colorSchemeTokens.onSurface,
  // &:error
  contentColor$error: colorSchemeTokens.onSurface,
  // &:error:focus
  contentColor$error$focus: colorSchemeTokens.onSurface,
  // &:error:hover
  contentColor$error$hover: colorSchemeTokens.onSurface,
  // &:hover
  contentColor$hover: colorSchemeTokens.onSurface,

  // labelText
  labelTextColor: colorSchemeTokens.onSurfaceVariant,
  labelTextFont: typeScaleTokens.bodyFont$lg,
  labelTextSize: typeScaleTokens.bodySize$lg,
  labelTextLineHeight: typeScaleTokens.bodyLineHeight$lg,
  labelTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$lg,
  labelTextWeight: typeScaleTokens.bodyWeight$lg,
  labelTextPopulatedLineHeight: typeScaleTokens.bodyLineHeight$sm,
  labelTextPopulatedSize: typeScaleTokens.bodySize$sm,
  labelTextPaddingBottom: spacingTokens.padding$2,
  // &:hover
  labelTextColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:focus
  labelTextColor$focus: colorSchemeTokens.primary,
  // &:disabled
  labelTextColor$disabled: colorSchemeTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  labelTextColor$error: colorSchemeTokens.error,
  // &:error:focus
  labelTextColor$error$focus: colorSchemeTokens.error,
  // &:error:hover
  labelTextColor$error$hover: colorSchemeTokens.error,

  // leadingContent
  leadingContentColor: colorSchemeTokens.onSurfaceVariant,
  leadingContentMinWidth: `calc(48px * ${scaleTokens.scale})`,
  // &:disabled
  leadingContentColor$disabled: colorSchemeTokens.onSurface,
  leadingContentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  leadingContentColor$focus: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  leadingContentColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:error
  leadingContentColor$error: colorSchemeTokens.onSurfaceVariant,
  // &:error:focus
  leadingContentColor$error$focus: colorSchemeTokens.onSurfaceVariant,
  // &:error:hover
  leadingContentColor$error$hover: colorSchemeTokens.onSurfaceVariant,

  // leadingIcon
  leadingIconSize: `calc(18px * ${scaleTokens.scale})`,

  // trailingContent
  trailingContentColor: colorSchemeTokens.onSurfaceVariant,
  trailingContentMinWidth: `calc(48px * ${scaleTokens.scale})`,
  // &:disabled
  trailingContentColor$disabled: colorSchemeTokens.onSurface,
  trailingContentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  trailingContentColor$focus: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  trailingContentColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:error
  trailingContentColor$error: colorSchemeTokens.error,
  // &:error:focus
  trailingContentColor$error$focus: colorSchemeTokens.error,
  // &:error:hover
  trailingContentColor$error$hover: colorSchemeTokens.onErrorContainer,

  // trailingIcon
  trailingIconSize: `calc(18px * ${scaleTokens.scale})`,

  // supporting
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextFont: typeScaleTokens.bodyFont$sm,
  supportingTextSize: typeScaleTokens.bodySize$sm,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  supportingTextWeight: typeScaleTokens.bodyWeight$sm,
  supportingTextLeadingSpace: spacingTokens.padding$4,
  supportingTextTopSpace: spacingTokens.padding$1,
  supportingTextTrailingSpace: spacingTokens.padding$4,
  // &:disabled
  supportingTextColor$disabled: colorSchemeTokens.onSurface,
  supportingTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  supportingTextColor$focus: colorSchemeTokens.onSurfaceVariant,
  // &:hover
  supportingTextColor$hover: colorSchemeTokens.onSurfaceVariant,
  // &:error
  supportingTextColor$error: colorSchemeTokens.error,
  // &:error:focus
  supportingTextColor$error$focus: colorSchemeTokens.error,
  // &:error:hover
  supportingTextColor$error$hover: colorSchemeTokens.error,

  // activeIndicator
  activeIndicatorColor: colorSchemeTokens.onSurfaceVariant,
  activeIndicatorHeight: outlineTokens.width$xs,
  // &:hover
  activeIndicatorColor$hover: colorSchemeTokens.onSurface,
  activeIndicatorHeight$hover: outlineTokens.width$xs,
  // &:focus
  activeIndicatorColor$focus: colorSchemeTokens.primary,
  activeIndicatorHeight$focus: outlineTokens.width$md,
  // &:disabled
  activeIndicatorColor$disabled: colorSchemeTokens.onSurface,
  activeIndicatorHeight$disabled: outlineTokens.width$xs,
  activeIndicatorOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  activeIndicatorColor$error: colorSchemeTokens.error,
  // &:error:hover
  activeIndicatorColor$error$hover: colorSchemeTokens.onErrorContainer,
  // &:error:focus
  activeIndicatorColor$error$focus: colorSchemeTokens.error,

  // outline
  outlineColor: colorSchemeTokens.outline,
  outlineWidth: outlineTokens.width$xs,
  // &:hover
  outlineColor$hover: colorSchemeTokens.onSurface,
  outlineWidth$hover: outlineTokens.width$xs,
  // &:focus
  outlineColor$focus: colorSchemeTokens.primary,
  outlineWidth$focus: outlineTokens.width$md,
  // &:disabled
  outlineWidth$disabled: outlineTokens.width$xs,
  outlineColor$disabled: colorSchemeTokens.onSurface,
  outlineOpacity$disabled: stateTokens.outlineOpacity$disabled,
  // &:error
  outlineColor$error: colorSchemeTokens.error,
  // &:error:hover
  outlineColor$error$hover: colorSchemeTokens.onErrorContainer,
  // &:error:focus
  outlineColor$error$focus: colorSchemeTokens.error,

  // outlineLabel
  outlineLabelPadding: spacingTokens.padding$1,
};

export const fieldBaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fieldBaseTheme = stylex.createTheme(fieldBaseTokens, vars);
