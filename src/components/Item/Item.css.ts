import { createTheme } from '@vanilla-extract/css';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { space } from '~/helpers/styles/space';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { themeTokens } from '../ThemeProvider';
import { calc } from '@vanilla-extract/css-utils';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

type IModifier = 'line-clamp';

const [tokensClassName, tokens] = createTheme({
  density: px(getDensity({ min: -1, max: 0 })),
  gap: px(space(3)),
  lineClamp: 'unset',
  leadingContent: {
    color: 'inherit',
  },
  trailingContentColor: {
    color: 'inherit',
  },
  overlineText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.label.sm,
  },
  headlineText: {
    color: themeTokens.colorScheme.onSurface,
    typography: themeTokens.typeScale.body.lg,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.sm,
  },
  trailingSupportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
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
  },
  section: {
    position: 'relative',
    display: 'flex',

    selectors: {
      [getModifierSelector({ section: 'start' })]: {
        color: tokens.leadingContent.color,
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit',
        alignItems: 'center',
        justifyContent: 'center',
      },

      [getModifierSelector({ section: 'main' })]: {
        flexGrow: 1,
      },

      [getModifierSelector({ section: 'trailingSupportingText' })]: {
        color: tokens.trailingSupportingText.color,
        alignItems: 'center',
        justifyContent: 'center',
        ...getTypographyStyles(tokens.trailingSupportingText.typography),
      },

      [getModifierSelector({ section: 'end' })]: {
        color: tokens.trailingContentColor.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
      },
    },
  },
  main: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: 'inherit',
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
  overlineText: {
    color: tokens.overlineText.color,
    ...getTypographyStyles(tokens.overlineText.typography),
  },
  headlineText: {
    // Needed since the default slot can have just text content, and ellipsis
    // need an inline display.
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: tokens.headlineText.color,
    ...getTypographyStyles({
      ...tokens.headlineText.typography,
      lineHeight: calc.add(
        tokens.headlineText.typography.lineHeight,
        tokens.density,
      ),
    }),
  },
  supportingText: {
    color: tokens.supportingText.color,
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
