import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { COMPONENT_NAME } from './TopAppBar.constants';
import { type ITopAppBarVariant } from './TopAppBar.types';

type IModifier = 'scrolling';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.none),
    height: px(64),
    color: {
      normal: themeTokens.colorScheme.surface,
      scrolling: themeTokens.colorScheme.surfaceContainer,
    },
    elevation: {
      normal: elevationLevelPreset[0],
      scrolling: elevationLevelPreset[2],
    },
  },
  leadingIcon: {
    size: px(24),
    color: themeTokens.colorScheme.onSurface,
  },
  trailingIcon: {
    size: px(24),
    color: themeTokens.colorScheme.onSurfaceVariant,
  },
  headline: {
    typography: themeTokens.typeScale.title.lg,
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  root: {
    width: '100%',
    height: tokens.container.height,

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
      },
    }),
  },
});

export type ITopAppBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ITopAppBarVariant;
}>;

export const topAppBarTheme = componentThemeFactory<ITopAppBarThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const topAppBarThemeVariants = {
  centerAligned: createStyles(),
  small: createStyles(),
  medium: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          height: px(112),
        },
        headline: {
          typography: themeTokens.typeScale.headline.sm,
        },
      }),
    },
  }),
  large: createStyles({
    root: {
      vars: overrideTokens(tokens, {
        container: {
          height: px(152),
        },
        headline: {
          typography: themeTokens.typeScale.headline.md,
        },
      }),
    },
  }),
};
