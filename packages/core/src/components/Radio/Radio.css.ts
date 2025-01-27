import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({
  root: {
    position: 'relative',
  },
  stateLayer: {
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
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
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
    borderRadius: px(themeTokens.shape.corner.circle),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: ({ root }) => ({
    // Input is also touch target
    appearance: 'none',
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
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
});

export type IRadioThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const RadioTheme = componentThemeFactory<IRadioThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
