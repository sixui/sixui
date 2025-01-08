import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'disabled' | 'non-interactive';

export const classNames = createStyles({
  root: {
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
      [getModifierSelector<IModifier>('non-interactive')]: {
        cursor: 'default',
        pointerEvents: 'none',
        userSelect: 'auto',
      },
    },
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  touchTarget: {},
  stateLayer: {},
  focusRing: {},
});

export type IButtonBaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const buttonBaseTheme = componentThemeFactory<IButtonBaseThemeFactory>({
  classNames,
  tokens: undefined,
});
