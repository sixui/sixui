import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './Item.constants';

type IModifier = 'line-clamp';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
      [modifierSelector({ section: 'start' })]: {
        color: tokens.nonText.color,
        opacity: tokens.nonText.opacity,
      },

      [modifierSelector({ section: 'main' })]: {
        flexGrow: 1,
      },

      [modifierSelector({ section: 'trailingSupportingText' })]: {
        color: tokens.trailingSupportingText.color,
        opacity: tokens.trailingSupportingText.opacity,
        ...typography(tokens.trailingSupportingText.typography),
      },

      [modifierSelector({ section: 'end' })]: {
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
      [modifierSelector<IModifier>('line-clamp', root)]: {
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
    ...typography(tokens.overline.typography),
  },
  label: {
    // Needed since the default slot can have just text content, and ellipsis
    // need an inline display.
    display: 'inline',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: tokens.label.color,
    opacity: tokens.label.opacity,
    ...typography({
      ...tokens.label.typography,
      lineHeight: calc.add(tokens.label.typography.lineHeight, DENSITY),
    }),
  },
  supportingText: {
    color: tokens.supportingText.color,
    opacity: tokens.supportingText.opacity,
    ...typography(tokens.supportingText.typography),
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
