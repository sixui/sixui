import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Radio.constants';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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

    vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('disabled', root)]: {
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
