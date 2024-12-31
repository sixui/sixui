import { createTheme, fallbackVar } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { Elevation } from '../Elevation';
import { cssLayers, themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = IInteraction | 'disabled' | 'expanded';

export const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: 'inherit',
    opacity: 'unset',
    elevation: elevationLevelPreset[0],
    shape: themeTokens.shape.corner.none,
    shapes: {
      topLeft: 'inherit',
      topRight: 'inherit',
      bottomRight: 'inherit',
      bottomLeft: 'inherit',
    },
  },
  outline: {
    style: 'solid',
    color: themeTokens.colorScheme.outline,
    opacity: 'unset',
    width: px(0),
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
    borderTopLeftRadius: fallbackVar(
      tokens.container.shape,
      tokens.container.shapes.topLeft,
    ),
    borderTopRightRadius: fallbackVar(
      tokens.container.shape,
      tokens.container.shapes.topRight,
    ),
    borderBottomRightRadius: fallbackVar(
      tokens.container.shape,
      tokens.container.shapes.bottomRight,
    ),
    borderBottomLeftRadius: fallbackVar(
      tokens.container.shape,
      tokens.container.shapes.bottomLeft,
    ),
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
  elevation: {
    vars: {
      [Elevation.theme.tokens.level]: tokens.container.elevation,
    },
  },
  background: {
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
    opacity: tokens.container.opacity,
  },
  outline: {
    // Separate node to support opacity changes.
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: `round(up, ${tokens.outline.width}, 1px)`,
    borderColor: tokens.outline.color,
    borderRadius: 'inherit',
    opacity: tokens.outline.opacity,
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
