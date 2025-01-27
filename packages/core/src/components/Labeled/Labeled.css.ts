import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'disabled' | 'has-error' | 'horizontal';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  label: {
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
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
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
    gap: calc.add(px(space(1)), DENSITY),

    selectors: {
      [getModifierSelector<IModifier>('horizontal')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: px(space(3)),
      },
      [getModifierSelector<IModifier>('disabled')]: {
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
    gap: calc.add(px(space(1)), DENSITY),
  },
  control: {
    display: 'flex',
    flexDirection: 'inherit',
    gap: px(space(3)),
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
    gap: px(space(2)),
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  label: ({ root }) => ({
    ...getTypographyStyles(tokens.label.typography),
    color: tokens.label.color.normal,
    cursor: 'pointer',

    selectors: {
      [getModifierSelector<IModifier>('has-error', root)]: {
        color: fallbackVar(tokens.label.color.error, tokens.label.color.normal),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
        cursor: 'unset',
      },
    },
  }),
  action: ({ root }) => ({
    flexGrow: 0,
    ...getTypographyStyles(tokens.trailingAction.typography),
    color: tokens.trailingAction.color.normal,
    display: 'flex',
    alignItems: 'center',

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.trailingAction.color.disabled,
        opacity: tokens.trailingAction.opacity.disabled,
      },
    },
  }),
  supportingText: ({ root }) => ({
    flexGrow: 0,
    ...getTypographyStyles(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('has-error', root)]: {
        color: fallbackVar(
          tokens.supportingText.color.error,
          tokens.supportingText.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.supportingText.color.disabled,
        opacity: tokens.supportingText.opacity.disabled,
      },
    },
  }),
  errorText: ({ root }) => ({
    flexGrow: 0,
    ...getTypographyStyles(tokens.errorText.typography),
    color: tokens.errorText.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
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
