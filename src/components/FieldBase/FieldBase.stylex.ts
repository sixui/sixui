import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/typo.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-text-field.scss

const vars = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '12px',
  topSpace$withLabel: '8px',
  bottomSpace: '12px',
  bottomSpace$withLabel: '8px',

  // container
  containerShape: 'unset',
  containerColor: 'inherit',
  // &:disabled
  containerColor$disabled: 'inherit',
  containerOpacity$disabled: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'inherit',
  stateLayerOpacity$hover: stateTokens.stateLayerOpacity$hover,
  // &:error
  stateLayerColor$error$hover: 'inherit',
  stateLayerOpacity$error$hover: 'unset',

  // content
  contentColor: colorRolesTokens.onSurface,
  contentColor$selection: colorRolesTokens.onSurface,
  contentBackground$selection: colorRolesTokens.surfaceSelection,
  contentFont: typescaleTokens.bodyFont$lg,
  contentSize: typescaleTokens.bodySize$lg,
  contentLineHeight: typescaleTokens.bodyLineHeight$lg,
  contentLetterSpacing: typescaleTokens.bodyLetterSpacing$lg,
  contentWeight: typescaleTokens.bodyWeight$lg,
  contentPlaceholderColor: colorRolesTokens.dim,
  contentPrefixColor: colorRolesTokens.onSurfaceVariant,
  contentPrefixTrailingSpace: '2px',
  contentSuffixColor: colorRolesTokens.onSurfaceVariant,
  contentSuffixLeadingSpace: '2px',
  // &:disabled
  contentColor$disabled: colorRolesTokens.onSurface,
  contentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  contentColor$focus: colorRolesTokens.onSurface,
  // &:error
  contentColor$error: colorRolesTokens.onSurface,
  // &:error:focus
  contentColor$error$focus: colorRolesTokens.onSurface,
  // &:error:hover
  contentColor$error$hover: colorRolesTokens.onSurface,
  // &:hover
  contentColor$hover: colorRolesTokens.onSurface,

  // labelText
  labelTextColor: colorRolesTokens.onSurfaceVariant,
  labelTextFont: typescaleTokens.bodyFont$lg,
  labelTextSize: typescaleTokens.bodySize$lg,
  labelTextLineHeight: typescaleTokens.bodyLineHeight$lg,
  labelTextLetterSpacing: typescaleTokens.bodyLetterSpacing$lg,
  labelTextWeight: typescaleTokens.bodyWeight$lg,
  labelTextPopulatedLineHeight: typescaleTokens.bodyLineHeight$sm,
  labelTextPopulatedSize: typescaleTokens.bodySize$sm,
  labelTextPaddingBottom: '8px',
  // &:hover
  labelTextColor$hover: colorRolesTokens.onSurfaceVariant,
  // &:focus
  labelTextColor$focus: colorRolesTokens.primary,
  // &:disabled
  labelTextColor$disabled: colorRolesTokens.onSurface,
  labelTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  labelTextColor$error: colorRolesTokens.error,
  // &:error:focus
  labelTextColor$error$focus: colorRolesTokens.error,
  // &:error:hover
  labelTextColor$error$hover: colorRolesTokens.error,

  // leadingContent
  leadingContentColor: colorRolesTokens.onSurfaceVariant,
  leadingContentMinWidth: '48px',
  // &:disabled
  leadingContentColor$disabled: colorRolesTokens.onSurface,
  leadingContentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  leadingContentColor$focus: colorRolesTokens.onSurfaceVariant,
  // &:hover
  leadingContentColor$hover: colorRolesTokens.onSurfaceVariant,
  // &:error
  leadingContentColor$error: colorRolesTokens.onSurfaceVariant,
  // &:error:focus
  leadingContentColor$error$focus: colorRolesTokens.onSurfaceVariant,
  // &:error:hover
  leadingContentColor$error$hover: colorRolesTokens.onSurfaceVariant,

  // leadingIcon
  leadingIconSize: '18px',

  // trailingContent
  trailingContentColor: colorRolesTokens.onSurfaceVariant,
  trailingContentMinWidth: '48px',
  // &:disabled
  trailingContentColor$disabled: colorRolesTokens.onSurface,
  trailingContentOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  trailingContentColor$focus: colorRolesTokens.onSurfaceVariant,
  // &:hover
  trailingContentColor$hover: colorRolesTokens.onSurfaceVariant,
  // &:error
  trailingContentColor$error: colorRolesTokens.error,
  // &:error:focus
  trailingContentColor$error$focus: colorRolesTokens.error,
  // &:error:hover
  trailingContentColor$error$hover: colorRolesTokens.onErrorContainer,

  // trailingIcon
  trailingIconSize: '18px',

  // supporting
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextFont: typescaleTokens.bodyFont$sm,
  supportingTextSize: typescaleTokens.bodySize$sm,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  supportingTextWeight: typescaleTokens.bodyWeight$sm,
  supportingTextLeadingSpace: '16px',
  supportingTextTopSpace: '4px',
  supportingTextTrailingSpace: '16px',
  // &:disabled
  supportingTextColor$disabled: colorRolesTokens.onSurface,
  supportingTextOpacity$disabled: stateTokens.opacity$disabled,
  // &:focus
  supportingTextColor$focus: colorRolesTokens.onSurfaceVariant,
  // &:hover
  supportingTextColor$hover: colorRolesTokens.onSurfaceVariant,
  // &:error
  supportingTextColor$error: colorRolesTokens.error,
  // &:error:focus
  supportingTextColor$error$focus: colorRolesTokens.error,
  // &:error:hover
  supportingTextColor$error$hover: colorRolesTokens.error,

  // activeIndicator
  activeIndicatorColor: colorRolesTokens.onSurfaceVariant,
  activeIndicatorHeight: '1px',
  // &:hover
  activeIndicatorColor$hover: colorRolesTokens.onSurface,
  activeIndicatorHeight$hover: '1px',
  // &:focus
  activeIndicatorColor$focus: colorRolesTokens.primary,
  activeIndicatorHeight$focus: '3px',
  // &:disabled
  activeIndicatorColor$disabled: colorRolesTokens.onSurface,
  activeIndicatorHeight$disabled: '1px',
  activeIndicatorOpacity$disabled: stateTokens.opacity$disabled,
  // &:error
  activeIndicatorColor$error: colorRolesTokens.error,
  // &:error:hover
  activeIndicatorColor$error$hover: colorRolesTokens.onErrorContainer,
  // &:error:focus
  activeIndicatorColor$error$focus: colorRolesTokens.error,

  // outline
  outlineColor: colorRolesTokens.outline,
  outlineWidth: '1px',
  // &:hover
  outlineColor$hover: colorRolesTokens.onSurface,
  outlineWidth$hover: '1px',
  // &:focus
  outlineColor$focus: colorRolesTokens.primary,
  outlineWidth$focus: '3px',
  // &:disabled
  outlineWidth$disabled: '1px',
  outlineColor$disabled: colorRolesTokens.onSurface,
  outlineOpacity$disabled: stateTokens.outlineOpacity$disabled,
  // &:error
  outlineColor$error: colorRolesTokens.error,
  // &:error:hover
  outlineColor$error$hover: colorRolesTokens.onErrorContainer,
  // &:error:focus
  outlineColor$error$focus: colorRolesTokens.error,

  // outlineLabel
  outlineLabelPadding: '4px',
};

export const fieldBaseTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const fieldBaseTheme = stylex.createTheme(fieldBaseTokens, vars);
