import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITextFieldStyleVarKey } from '@/components/atoms/TextField';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-text-field.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-text-field.scss
const vars: Partial<IStyleVars<ITextFieldStyleVarKey>> = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '16px',
  bottomSpace: '16px',

  // content
  contentColor: colorRolesVars.onSurface,
  contentColor$selection: colorRolesVars.onSurface,
  contentBackground$selection: colorRolesVars.surfaceSelection,
  contentFont: typescaleVars.bodyFont$lg,
  contentSize: typescaleVars.bodySize$lg,
  contentLineHeight: typescaleVars.bodyLineHeight$lg,
  contentTracking: typescaleVars.bodyTracking$lg,
  contentWeight: typescaleVars.bodyWeight$lg,
  contentPlaceholderColor: colorRolesVars.onSurfaceVariant,
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

  // label
  labelTextColor: colorRolesVars.onSurfaceVariant,
  labelTextFont: typescaleVars.bodyFont$lg,
  labelTextSize: typescaleVars.bodySize$lg,
  labelTextLineHeight: typescaleVars.bodyLineHeight$lg,
  labelTextTracking: typescaleVars.bodyTracking$lg,
  labelTextWeight: typescaleVars.bodyWeight$lg,
  labelTextPopulatedLineHeight: typescaleVars.bodyLineHeight$sm,
  labelTextPopulatedSize: typescaleVars.bodySize$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  labelTextColor$focus: colorRolesVars.primary,
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
  leadingIconSize: '24px',

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
  trailingIconSize: '24px',

  // supporting
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextTracking: typescaleVars.bodyTracking$sm,
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

  // caret
  caretColor: colorRolesVars.primary,
  // &:focus
  caretColor$focus: colorRolesVars.primary,
  // &:error:focus
  caretColor$error$focus: colorRolesVars.error,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ITextFieldStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
