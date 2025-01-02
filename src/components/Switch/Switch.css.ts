import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'disabled'
  | 'on'
  | 'checked'
  | 'with-icon'
  | 'loading';

const classNames = createStyles({
  root: {
    position: 'relative',
  },
  stateLayer: {
    borderRadius: themeTokens.shape.corner.full,
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
    inset: 'unset',
  },
  focusRing: {},
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
  tokens: undefined,
});
