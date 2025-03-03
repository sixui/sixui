import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { COMPONENT_NAME } from './TopAppBar.constants';
import { type ITopAppBarVariant } from './TopAppBar.types';

type IModifier = 'with-divider' | 'scrolling';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.none),
    height: px(64),
    leadingSpace: px(space('$xs')),
    trailingSpace: px(space('$xs')),
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '100%',
    height: tokens.container.height,

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
      },
    }),
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: px(space('$md')),
    paddingLeft: px(tokens.container.leadingSpace),
    paddingRight: px(tokens.container.trailingSpace),
    height: px(64),
    flexShrink: 0,

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
      },
    }),
  },
  leadingNavigationSlot: {
    display: 'flex',
    alignItems: 'center',
    gap: px(space('$md')),
    flexGrow: 0,
  },
  headlineSlot: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  headlineText: {
    ...typography(tokens.headline.typography),
  },
  trailingActionsSlot: {
    display: 'flex',
    alignItems: 'center',
    gap: px(space('$md')),
    flexBasis: px(40),
  },
  headlineSection: {
    paddingLeft: px(calc.add(tokens.container.leadingSpace, space('$md'))),
    paddingRight: px(calc.add(tokens.container.leadingSpace, space('$md'))),
    display: 'flex',
    alignItems: 'end',
    width: '100%',
    flexGrow: 1,
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
  centerAligned: createStyles({
    headline: {
      textAlign: 'center',
    },
  }),
  small: createStyles(),
  medium: createStyles({
    root: {
      minHeight: px(112),

      vars: overrideTokens(tokens, {
        container: {
          height: 'auto',
        },
        headline: {
          typography: themeTokens.typeScale.headline.sm,
        },
      }),
    },
    headlineSection: {
      paddingBottom: px(24),
    },
  }),
  large: createStyles({
    root: {
      minHeight: px(152),

      vars: overrideTokens(tokens, {
        container: {
          height: 'auto',
        },
        headline: {
          typography: themeTokens.typeScale.headline.md,
        },
      }),
    },
    headlineSection: {
      paddingBottom: px(28),
    },
  }),
};
