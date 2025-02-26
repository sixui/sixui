import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './DropZone.constants';

type IModifier = 'disabled' | 'dropping' | 'interactive';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.md),
    color: {
      normal: 'transparent',
      dropping: themeTokens.colorScheme.primaryContainer,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  outline: {
    color: {
      normal: themeTokens.colorScheme.outlineVariant,
      dropping: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    width: {
      normal: px(themeTokens.outline.width.sm),
      dropping: px(themeTokens.outline.width.sm),
      disabled: px(themeTokens.outline.width.sm),
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
  },
  icon: {
    size: px(24),
    color: {
      normal: themeTokens.colorScheme.onSurface,
      dropping: themeTokens.colorScheme.onPrimaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      dropping: themeTokens.colorScheme.onPrimaryContainer,
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
    paddingInline: px(space(6)),
    paddingBlock: px(space(5)),
    flexDirection: 'column',
    gap: px(space(3)),
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
      [modifierSelector<IModifier>('disabled')]: {
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
      [modifierSelector<IModifier>('dropping')]: {
        pointerEvents: 'none',

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
      [modifierSelector<IModifier>('interactive')]: {
        textWrap: 'unset',
      },
    },
  },
  icon: ({ root }) => ({
    color: tokens.icon.color.normal,
    fill: 'currentColor',
    fontSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    inlineSize: tokens.icon.size,

    selectors: {
      [modifierSelector<IModifier>('dropping', root)]: {
        color: tokens.label.color.dropping,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    ...typography(tokens.label.typography),
    color: tokens.label.color.normal,

    selectors: {
      [modifierSelector<IModifier>('dropping', root)]: {
        color: tokens.label.color.dropping,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
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
