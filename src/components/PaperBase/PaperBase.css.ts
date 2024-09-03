import { createTheme } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { Elevation } from '../Elevation';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';

type IModifier = 'disabled';

export const [tokensClassName, tokens] = createTheme({
  container: {
    color: themeTokens.colorScheme.surface,
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    elevation: elevationLevelPreset[0],
    shape: {
      topLeft: themeTokens.shape.corner.none,
      topRight: themeTokens.shape.corner.none,
      bottomRight: themeTokens.shape.corner.none,
      bottomLeft: themeTokens.shape.corner.none,
    },
  },
  outline: {
    style: 'solid',
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
    zIndex: 0,
    position: 'relative',
    borderTopLeftRadius: tokens.container.shape.topLeft,
    borderTopRightRadius: tokens.container.shape.topRight,
    borderBottomRightRadius: tokens.container.shape.bottomRight,
    borderBottomLeftRadius: tokens.container.shape.bottomLeft,

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        color: `color-mix(in srgb, currentColor calc(${tokens.text.opacity.disabled} * 100%), transparent)`,
      },
    },
  },
  elevation: {
    vars: {
      [Elevation.styles.tokens.level]: tokens.container.elevation,
    },
    zIndex: -1,
  },
  background: ({ root }) => ({
    // Separate node to support opacity changes.
    backgroundColor: tokens.container.color,
    borderRadius: 'inherit',
    inset: px(tokens.outline.width),
    position: 'absolute',
    zIndex: -1,

    selectors: {
      [getModifierSelector('disabled', root)]: {
        opacity: tokens.container.opacity.disabled,
      },
    },
  }),
  outline: {
    // Separate node to support opacity changes.
    zIndex: 1,
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderStyle: tokens.outline.style,
    borderWidth: px(tokens.outline.width),
    borderColor: tokens.outline.color,
    borderRadius: 'inherit',
  },
});

export type IPaperBaseStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const paperBaseStyles = stylesFactory<IPaperBaseStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
