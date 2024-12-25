import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'checked'
  | 'indeterminate'
  | 'loading';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  size: px(18),
});

const classNames = createStyles({
  root: {
    width: calc.add(tokens.size, DENSITY),
    height: calc.add(tokens.size, DENSITY),
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    color: themeTokens.colorScheme.onSurfaceVariant,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(2),
        color: {
          disabled: 'transparent',
        },
      },
      outline: {
        color: {
          normal: themeTokens.colorScheme.onSurfaceVariant,
        },
        width: {
          normal: px(themeTokens.outline.width.sm),
        },
        opacity: {
          disabled: themeTokens.state.opacity.disabled,
        },
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>({ loading: true })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: {
              normal: px(themeTokens.outline.width.none),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>({ hovered: true })]: {
        zIndex: 1,
      },
      [getModifierSelector<IModifier>({ checked: true, loading: false })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: themeTokens.colorScheme.primary,
              disabled: themeTokens.colorScheme.onSurface,
            },
            opacity: {
              disabled: themeTokens.state.opacity.disabled,
            },
          },
          outline: {
            width: {
              normal: px(themeTokens.outline.width.none),
            },
          },
        }),
      },
    },
  },
  stateLayer: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    borderRadius: px(themeTokens.shape.corner.circle),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        pressed: themeTokens.colorScheme.primary,
      },
    }),
  },
  focusRing: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    borderRadius: px(themeTokens.shape.corner.circle),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: ({ root }) => ({
    // Input is also touch target
    appearance: 'none',
    width: px(
      calc.add(
        themeTokens.density.minTargetSize,
        calc.multiply(2, themeTokens.outline.width.sm),
      ),
    ),
    height: px(
      calc.add(
        themeTokens.density.minTargetSize,
        calc.multiply(2, themeTokens.outline.width.sm),
      ),
    ),
    outline: 'none',
    margin: 0,
    position: 'absolute',
    zIndex: 1,
    cursor: 'pointer',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  }),
  progressIndicator: {
    width: tokens.size,
    height: tokens.size,
  },
  overlay: {
    inset: 0,
    position: 'absolute',
  },
});

export type ICheckboxThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const checkboxTheme = componentThemeFactory<ICheckboxThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
