import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Labeled.constants';

type IModifier =
  | 'disabled'
  | 'read-only'
  | 'has-error'
  | 'horizontal'
  | 'unassociated';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: 'inherit',
      error: 'inherit',
      readOnly: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      readOnly: 'inherit',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  trailingAction: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: 'inherit',
      error: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      error: 'inherit',
      readOnly: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      readOnly: 'inherit',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  errorText: {
    typography: themeTokens.typeScale.body.sm,
    color: {
      normal: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: calc.add(px(space('$xs')), DENSITY),

    selectors: {
      [modifierSelector<IModifier>('horizontal')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: px(space('$md')),
      },
      [modifierSelector<IModifier>('disabled')]: {
        pointerEvents: 'none',
      },
    },
  },
  content: {
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'inherit',
    alignItems: 'normal',
    gap: calc.add(px(space('$xs')), DENSITY),
  },
  control: {
    display: 'flex',
    flexDirection: 'inherit',
    gap: px(space('$md')),
  },
  rows: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  labelAndActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: px(space('$sm')),
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  label: ({ root }) => ({
    ...typography(tokens.label.typography),
    width: '100%',
    color: tokens.label.color.normal,
    cursor: 'pointer',

    selectors: {
      [modifierSelector<IModifier>('unassociated', root)]: {
        cursor: 'unset',
      },
      [modifierSelector<IModifier>('has-error', root)]: {
        color: fallbackVar(tokens.label.color.error, tokens.label.color.normal),
      },
      [modifierSelector<IModifier>(['disabled', '!read-only'], root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
        cursor: 'unset',
      },
      [modifierSelector<IModifier>('read-only', root)]: {
        color: tokens.label.color.readOnly,
        opacity: tokens.label.opacity.readOnly,
      },
    },
  }),
  action: ({ root }) => ({
    flexGrow: 0,
    ...typography(tokens.trailingAction.typography),
    color: tokens.trailingAction.color.normal,
    display: 'flex',
    alignItems: 'center',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.trailingAction.color.disabled,
        opacity: tokens.trailingAction.opacity.disabled,
      },
    },
  }),
  supportingTextContainer: ({ root }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: px(space('$sm')),
    flexGrow: 0,
    ...typography(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,

    selectors: {
      [modifierSelector<IModifier>(['disabled', '!read-only'], root)]: {
        color: tokens.supportingText.color.disabled,
        opacity: tokens.supportingText.opacity.disabled,
      },
      [modifierSelector<IModifier>('read-only', root)]: {
        color: tokens.supportingText.color.readOnly,
        opacity: tokens.supportingText.opacity.readOnly,
      },
    },
  }),
  supportingText: {
    flexGrow: 1,
  },
  trailingSupportingText: {
    flexGrow: 0,
  },
  errorText: ({ root }) => ({
    flexGrow: 0,
    ...typography(tokens.errorText.typography),
    color: tokens.errorText.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.errorText.color.disabled,
        opacity: tokens.errorText.opacity.disabled,
      },
    },
  }),
});

export type ILabeledThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const labeledTheme = componentThemeFactory<ILabeledThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
