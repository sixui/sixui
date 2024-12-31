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
    opacity: '1',
    elevation: {
      normal: elevationLevelPreset[0],
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
      disabled: elevationLevelPreset[0],
    },
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
    color: {
      normal: themeTokens.colorScheme.outline,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.outlineOpacity.disabled,
    },
    width: {
      normal: px(0),
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
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
  elevation: ({ root }) => ({
    vars: {
      [Elevation.theme.tokens.level]: tokens.container.elevation.normal,
    },

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        vars: {
          [Elevation.theme.tokens.level]: fallbackVar(
            tokens.container.elevation.focused,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        vars: {
          [Elevation.theme.tokens.level]: fallbackVar(
            tokens.container.elevation.hovered,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        vars: {
          [Elevation.theme.tokens.level]: fallbackVar(
            tokens.container.elevation.pressed,
            tokens.container.elevation.normal,
          ),
        },
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        vars: {
          [Elevation.theme.tokens.level]: fallbackVar(
            tokens.container.elevation.disabled,
            tokens.container.elevation.normal,
          ),
        },
      },
    },
  }),
  background: {
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
    opacity: tokens.container.opacity,
  },
  outline: ({ root }) => ({
    // Separate node to support opacity changes.
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: `round(up, ${tokens.outline.width.normal}, 1px)`,
    borderColor: tokens.outline.color.normal,
    borderRadius: 'inherit',

    selectors: {
      [getModifierSelector<IModifier>('focused', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.focused,
          tokens.outline.color.normal,
        ),
        borderWidth: `round(up, ${fallbackVar(
          tokens.outline.width.focused,
          tokens.outline.width.normal,
        )}, 1px)`,
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.hovered,
          tokens.outline.color.normal,
        ),
        borderWidth: `round(up, ${fallbackVar(
          tokens.outline.width.hovered,
          tokens.outline.width.normal,
        )}, 1px)`,
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.pressed,
          tokens.outline.color.normal,
        ),
        borderWidth: `round(up, ${fallbackVar(
          tokens.outline.width.pressed,
          tokens.outline.width.normal,
        )}, 1px)`,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        borderColor: fallbackVar(
          tokens.outline.color.disabled,
          tokens.outline.color.normal,
        ),
        borderWidth: `round(up, ${fallbackVar(
          tokens.outline.width.disabled,
          tokens.outline.width.normal,
        )}, 1px)`,
        opacity: tokens.outline.opacity.disabled,
      },
    },
  }),
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
