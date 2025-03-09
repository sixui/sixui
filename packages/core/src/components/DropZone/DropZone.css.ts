import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './DropZone.constants';

type IModifier = 'disabled' | 'interactive' | 'dropping' | 'with-error';

const DENSITY = px(density({ min: -4, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.md),
    color: {
      normal: 'transparent',
      dropping: themeTokens.colorScheme.primaryContainer,
      error: themeTokens.colorScheme.errorContainer,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  outline: {
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      dropping: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.onSurface,
    },
    width: {
      normal: px(themeTokens.outline.width.sm),
      dropping: px(themeTokens.outline.width.sm),
      error: px(themeTokens.outline.width.sm),
      disabled: px(themeTokens.outline.width.sm),
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
  text: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      interactive: themeTokens.colorScheme.primary,
      dropping: themeTokens.colorScheme.onPrimaryContainer,
      error: themeTokens.colorScheme.onErrorContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  actionIcon: {
    size: px(18),
    color: {
      normal: themeTokens.colorScheme.onSurface,
      interactive: themeTokens.colorScheme.primary,
      dropping: themeTokens.colorScheme.onPrimaryContainer,
      error: themeTokens.colorScheme.onErrorContainer,
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
      error: themeTokens.colorScheme.error,
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
    gap: px(space('$xs')),
  },
  button: ({ root }) => ({
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    paddingInline: px(space('$xl')),
    paddingBlock: calc.add(px(space('$xl')), DENSITY),
    flexDirection: 'column',
    gap: calc.add(px(space('$md')), DENSITY),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',

    vars: {
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.container.color.normal,
        },
        outline: {
          width: tokens.outline.width.normal,
          color: tokens.outline.color.normal,
          style: 'dashed',
        },
      }),
    },

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        pointerEvents: 'none',

        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            opacity: tokens.container.opacity.disabled,
          },
          outline: {
            width: tokens.outline.width.disabled,
            color: tokens.outline.color.disabled,
            opacity: tokens.outline.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>(['dropping', '!with-error'], root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.dropping,
          },
          outline: {
            width: tokens.outline.width.dropping,
            color: tokens.outline.color.dropping,
          },
        }),
      },
      [modifierSelector<IModifier>('with-error', root)]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.error,
          },
          outline: {
            width: tokens.outline.width.error,
            color: tokens.outline.color.error,
          },
        }),
      },
      [modifierSelector<IModifier>('interactive', root)]: {
        textWrap: 'unset',
      },
    },
  }),
  text: ({ root }) => ({
    ...typography(tokens.text.typography),
    color: tokens.text.color.normal,

    selectors: {
      [modifierSelector<IModifier>('interactive', root)]: {
        color: tokens.text.color.interactive,
      },
      [modifierSelector<IModifier>(['dropping', '!with-error'], root)]: {
        color: tokens.text.color.dropping,
      },
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.text.color.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.text.color.disabled,
        opacity: tokens.text.opacity.disabled,
      },
    },
  }),
  label: {},
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: px(space('$sm')),
    height: px(40),
  },
  actionIcon: ({ root }) => ({
    color: tokens.actionIcon.color.normal,
    fill: 'currentColor',
    fontSize: tokens.actionIcon.size,
    blockSize: tokens.actionIcon.size,
    inlineSize: tokens.actionIcon.size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    selectors: {
      [modifierSelector<IModifier>('interactive', root)]: {
        color: tokens.actionIcon.color.interactive,
      },
      [modifierSelector<IModifier>(['dropping', '!with-error'], root)]: {
        color: tokens.actionIcon.color.dropping,
      },
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.actionIcon.color.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.actionIcon.color.disabled,
        opacity: tokens.actionIcon.opacity.disabled,
      },
    },
  }),
  actionLabel: {},
  supportingTextContainer: ({ root }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: px(space('$md')),
    ...typography(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.supportingText.color.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.supportingText.color.disabled,
        opacity: tokens.supportingText.opacity.disabled,
      },
    },
  }),
  supportingText: {
    flexGrow: 1,
  },
  trailingSupportingText: {
    flexGrow: 0,
  },
});

export type IDropZoneThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const dropZoneTheme = componentThemeFactory<IDropZoneThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
