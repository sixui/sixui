import stylex from '@stylexjs/stylex';

import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

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
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:error
  stateLayerColor$error$hover: 'inherit',
  stateLayerOpacity$error$hover: 'unset',

  // content
  contentColor: colorRolesVars.onSurface,
  contentColor$selection: colorRolesVars.onSurface,
  contentBackground$selection: colorRolesVars.surfaceSelection,
  contentFont: typescaleVars.bodyFont$lg,
  contentSize: typescaleVars.bodySize$lg,
  contentLineHeight: typescaleVars.bodyLineHeight$lg,
  contentLetterSpacing: typescaleVars.bodyLetterSpacing$lg,
  contentWeight: typescaleVars.bodyWeight$lg,
  contentPlaceholderColor: colorRolesVars.dim,
  contentPrefixColor: colorRolesVars.onSurfaceVariant,
  contentPrefixTrailingSpace: '2px',
  contentSuffixColor: colorRolesVars.onSurfaceVariant,
  contentSuffixLeadingSpace: '2px',
  // &:disabled
  contentColor$disabled: colorRolesVars.onSurface,
  contentOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  contentColor$focus: colorRolesVars.onSurface,
  // &:error
  contentColor$error: colorRolesVars.onSurface,
  // &:error:focus
  contentColor$error$focus: colorRolesVars.onSurface,
  // &:error:hover
  contentColor$error$hover: colorRolesVars.onSurface,
  // &:hover
  contentColor$hover: colorRolesVars.onSurface,

  // labelText
  labelTextColor: colorRolesVars.onSurfaceVariant,
  labelTextFont: typescaleVars.bodyFont$lg,
  labelTextSize: typescaleVars.bodySize$lg,
  labelTextLineHeight: typescaleVars.bodyLineHeight$lg,
  labelTextLetterSpacing: typescaleVars.bodyLetterSpacing$lg,
  labelTextWeight: typescaleVars.bodyWeight$lg,
  labelTextPopulatedLineHeight: typescaleVars.bodyLineHeight$sm,
  labelTextPopulatedSize: typescaleVars.bodySize$sm,
  labelTextPaddingBottom: '8px',
  // &:hover
  labelTextColor$hover: colorRolesVars.onSurfaceVariant,
  // &:focus
  labelTextColor$focus: colorRolesVars.primary,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:error
  labelTextColor$error: colorRolesVars.error,
  // &:error:focus
  labelTextColor$error$focus: colorRolesVars.error,
  // &:error:hover
  labelTextColor$error$hover: colorRolesVars.error,

  // leadingContent
  leadingContentColor: colorRolesVars.onSurfaceVariant,
  leadingContentMinWidth: '48px',
  // &:disabled
  leadingContentColor$disabled: colorRolesVars.onSurface,
  leadingContentOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  leadingContentColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  leadingContentColor$hover: colorRolesVars.onSurfaceVariant,
  // &:error
  leadingContentColor$error: colorRolesVars.onSurfaceVariant,
  // &:error:focus
  leadingContentColor$error$focus: colorRolesVars.onSurfaceVariant,
  // &:error:hover
  leadingContentColor$error$hover: colorRolesVars.onSurfaceVariant,

  // leadingIcon
  leadingIconSize: '18px',

  // trailingContent
  trailingContentColor: colorRolesVars.onSurfaceVariant,
  trailingContentMinWidth: '48px',
  // &:disabled
  trailingContentColor$disabled: colorRolesVars.onSurface,
  trailingContentOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  trailingContentColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  trailingContentColor$hover: colorRolesVars.onSurfaceVariant,
  // &:error
  trailingContentColor$error: colorRolesVars.error,
  // &:error:focus
  trailingContentColor$error$focus: colorRolesVars.error,
  // &:error:hover
  trailingContentColor$error$hover: colorRolesVars.onErrorContainer,

  // trailingIcon
  trailingIconSize: '18px',

  // supporting
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,
  supportingTextLeadingSpace: '16px',
  supportingTextTopSpace: '4px',
  supportingTextTrailingSpace: '16px',
  // &:disabled
  supportingTextColor$disabled: colorRolesVars.onSurface,
  supportingTextOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  supportingTextColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  supportingTextColor$hover: colorRolesVars.onSurfaceVariant,
  // &:error
  supportingTextColor$error: colorRolesVars.error,
  // &:error:focus
  supportingTextColor$error$focus: colorRolesVars.error,
  // &:error:hover
  supportingTextColor$error$hover: colorRolesVars.error,

  // activeIndicator
  activeIndicatorColor: colorRolesVars.onSurfaceVariant,
  activeIndicatorHeight: '1px',
  // &:hover
  activeIndicatorColor$hover: colorRolesVars.onSurface,
  activeIndicatorHeight$hover: '1px',
  // &:focus
  activeIndicatorColor$focus: colorRolesVars.primary,
  activeIndicatorHeight$focus: '3px',
  // &:disabled
  activeIndicatorColor$disabled: colorRolesVars.onSurface,
  activeIndicatorHeight$disabled: '1px',
  activeIndicatorOpacity$disabled: stateVars.opacity$disabled,
  // &:error
  activeIndicatorColor$error: colorRolesVars.error,
  // &:error:hover
  activeIndicatorColor$error$hover: colorRolesVars.onErrorContainer,
  // &:error:focus
  activeIndicatorColor$error$focus: colorRolesVars.error,

  // outline
  outlineColor: colorRolesVars.outline,
  outlineWidth: '1px',
  // &:hover
  outlineColor$hover: colorRolesVars.onSurface,
  outlineWidth$hover: '1px',
  // &:focus
  outlineColor$focus: colorRolesVars.primary,
  outlineWidth$focus: '3px',
  // &:disabled
  outlineWidth$disabled: '1px',
  outlineColor$disabled: colorRolesVars.onSurface,
  outlineOpacity$disabled: stateVars.outlineOpacity$disabled,
  // &:error
  outlineColor$error: colorRolesVars.error,
  // &:error:hover
  outlineColor$error$hover: colorRolesVars.onErrorContainer,
  // &:error:focus
  outlineColor$error$focus: colorRolesVars.error,

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
