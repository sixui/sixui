import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { Elevation } from '../Elevation';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled' | 'expanded';

export const [tokensClassName, tokens] = createTheme({
  container: {
    color: {
      normal: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    elevation: {
      normal: elevationLevelPreset[0],
      disabled: elevationLevelPreset[0],
    },
    shape: {
      topLeft: themeTokens.shape.corner.none,
      topRight: themeTokens.shape.corner.none,
      bottomRight: themeTokens.shape.corner.none,
      bottomLeft: themeTokens.shape.corner.none,
    },
  },
  outline: {
    style: 'unset',
    color: themeTokens.colorScheme.outlineVariant,
    width: themeTokens.outline.width.none,
  },
  text: {
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    borderTopLeftRadius: tokens.container.shape.topLeft,
    borderTopRightRadius: tokens.container.shape.topRight,
    borderBottomRightRadius: tokens.container.shape.bottomRight,
    borderBottomLeftRadius: tokens.container.shape.bottomLeft,
    zIndex: 0,

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        color: `color-mix(in srgb, currentColor calc(${tokens.text.opacity.disabled} * 100%), transparent)`,
      },
      [getModifierSelector<IModifier>('expanded')]: {
        width: '100%',
        height: '100%',
      },
    },
  },
  elevation: ({ root }) => ({
    vars: {
      [Elevation.theme.tokens.level]: tokens.container.elevation.normal,
    },

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        vars: {
          [Elevation.theme.tokens.level]: tokens.container.elevation.disabled,
        },
      },
    },
  }),
  background: ({ root }) => ({
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color.normal,
    borderRadius: 'inherit',
    inset: px(tokens.outline.width),
    position: 'absolute',
    zIndex: -1,

    selectors: {
      [getModifierSelector('disabled', root)]: {
        backgroundColor: fallbackVar(
          tokens.container.color.disabled,
          tokens.container.color.normal,
        ),
        opacity: tokens.container.opacity.disabled,
      },
    },
  }),
  outline: {
    // Separate node to support opacity changes.
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: `max(${px(tokens.outline.width)}, 1px)`,
    borderColor: tokens.outline.color,
    borderRadius: 'inherit',
  },
});

export type IPaperBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const paperBaseTheme = componentThemeFactory<IPaperBaseThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
