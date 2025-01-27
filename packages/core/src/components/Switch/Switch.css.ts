import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'on'
  | 'checked'
  | 'with-icon'
  | 'loading';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({
  root: {
    position: 'relative',
  },
  stateLayer: {
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
    borderRadius: px(themeTokens.shape.corner.circle),
    inset: 'unset',
  },
  focusRing: {
    borderRadius: px(themeTokens.shape.corner.full),
  },
  input: ({ root }) => ({
    // Input is also touch target
    appearance: 'none',
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
    outline: 'none',
    margin: 0,
    position: 'absolute',
    zIndex: '1',
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

export type ISwitchThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const basicTemplateTheme = componentThemeFactory<ISwitchThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
