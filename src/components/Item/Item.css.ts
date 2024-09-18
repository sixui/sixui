import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'line-clamp';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  gap: px(space(3)),
  lineClamp: 'unset',
  nonText: {
    color: 'inherit',
    opacity: 'unset',
  },
  overline: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: 'unset',
    typography: themeTokens.typeScale.label.sm,
  },
  label: {
    color: themeTokens.colorScheme.onSurface,
    opacity: 'unset',
    typography: themeTokens.typeScale.body.lg,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: 'unset',
    typography: themeTokens.typeScale.body.sm,
  },
  trailingSupportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: 'unset',
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = createStyles({
  root: {
    alignItems: 'stretch',
    display: 'flex',
    position: 'relative',
    height: '100%',
    gap: tokens.gap,
    overflow: 'hidden',
  },
  section: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    selectors: {
      [getModifierSelector({ section: 'start' })]: {
        color: tokens.nonText.color,
        opacity: tokens.nonText.opacity,
      },

      [getModifierSelector({ section: 'main' })]: {
        flexGrow: 1,
      },

      [getModifierSelector({ section: 'trailingSupportingText' })]: {
        color: tokens.trailingSupportingText.color,
        opacity: tokens.trailingSupportingText.opacity,
        ...getTypographyStyles(tokens.trailingSupportingText.typography),
      },

      [getModifierSelector({ section: 'end' })]: {
        color: tokens.nonText.color,
        opacity: tokens.nonText.opacity,
      },
    },
  },
  main: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
    overflow: 'hidden',

    selectors: {
      [getModifierSelector<IModifier>('line-clamp', root)]: {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        hyphens: 'auto',
        WebkitLineClamp: tokens.lineClamp,
      },
    },
  }),
  overline: {
    color: tokens.overline.color,
    opacity: tokens.overline.opacity,
    ...getTypographyStyles(tokens.overline.typography),
  },
  label: {
    // Needed since the default slot can have just text content, and ellipsis
    // need an inline display.
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: tokens.label.color,
    opacity: tokens.label.opacity,
    ...getTypographyStyles({
      ...tokens.label.typography,
      lineHeight: calc.add(tokens.label.typography.lineHeight, DENSITY),
    }),
  },
  supportingText: {
    color: tokens.supportingText.color,
    opacity: tokens.supportingText.opacity,
    ...getTypographyStyles(tokens.supportingText.typography),
  },
});

export type IItemThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const itemTheme = componentThemeFactory<IItemThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
