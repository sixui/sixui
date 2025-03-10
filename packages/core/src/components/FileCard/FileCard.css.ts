import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Card, CardContent } from '~/components/Card';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './FileCard.constants';

type IModifier = 'disabled' | 'with-error' | 'with-thumb' | 'loading';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    minHeight: px(72),
  },
  media: {
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      loading: themeTokens.state.opacity.disabled,
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  progressIndicator: {
    size: px(36),
    color: themeTokens.colorScheme.onSecondaryContainer,
  },
  icon: {
    size: px(36),
    color: {
      normal: themeTokens.colorScheme.onSecondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      loading: themeTokens.state.opacity.disabled,
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  fileName: {
    typography: themeTokens.typeScale.label.md,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  fileSize: {
    typography: themeTokens.typeScale.label.sm,
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      disabled: themeTokens.colorScheme.onSurfaceVariant,
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
    },
  },
  moveHandle: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: '1',
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: calc.add(tokens.container.minHeight, DENSITY),
    position: 'relative',
    flexGrow: 1,

    selectors: {
      [modifierSelector<IModifier>('with-error')]: {
        vars: overrideTokens(Card.theme.tokens, {
          outline: {
            color: {
              normal: themeTokens.colorScheme.error,
            },
          },
        }),
      },
    },
  },
  media: ({ root }) => ({
    backgroundColor: tokens.media.color.normal,
    width: tokens.container.minHeight,
    aspectRatio: '1',

    selectors: {
      [modifierSelector<IModifier>(['!disabled', 'with-thumb'], root)]: {
        background: `repeating-conic-gradient(color-mix(in srgb,
        ${themeTokens.colorScheme.outlineVariant} 40%, transparent) 0% 25%,
        transparent 0% 50%) 50% / 20px 20px`,
      },
    },
  }),
  mediaContent: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>('loading', root)]: {
        boxShadow: `inset 0 0 0 2000px color-mix(in srgb, ${themeTokens.colorScheme.surface}, transparent ${calc.multiply(tokens.media.opacity.loading, '100%')})`,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        boxShadow: `inset 0 0 0 2000px color-mix(in srgb, ${themeTokens.colorScheme.surface}, transparent 33%)`,
        filter: 'grayscale(1)',
      },
    },
  }),
  progressIndicator: {
    color: tokens.progressIndicator.color,
    fontSize: tokens.progressIndicator.size,
  },
  icon: ({ root }) => ({
    display: 'flex',
    fill: 'currentColor',
    color: tokens.icon.color.normal,
    fontSize: tokens.icon.size,
    blockSize: tokens.icon.size,
    inlineSize: tokens.icon.size,

    selectors: {
      [modifierSelector<IModifier>('loading', root)]: {
        opacity: tokens.icon.opacity.loading,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
    },
  }),
  content: {
    justifyContent: 'center',

    vars: overrideTokens(CardContent.theme.tokens, {
      gap: px(space('$xs')),
    }),
  },
  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: px(space('$xs')),
  },
  fileName: ({ root }) => ({
    ...typography(tokens.fileName.typography),
    color: tokens.fileName.color.normal,
    wordBreak: 'break-word',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.fileName.color.disabled,
        opacity: tokens.fileName.opacity.disabled,
      },
    },
  }),
  fileSize: ({ root }) => ({
    ...typography(tokens.fileSize.typography),
    color: tokens.fileSize.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.fileSize.color.disabled,
        opacity: tokens.fileSize.opacity.disabled,
      },
    },
  }),
  supportingText: ({ root }) => ({
    ...typography(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.supportingText.color.error,
      },
    },
  }),
  moveHandle: {
    color: tokens.moveHandle.color,
    opacity: tokens.moveHandle.opacity,
  },
});

export type IFileCardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const fileCardTheme = componentThemeFactory<IFileCardThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
