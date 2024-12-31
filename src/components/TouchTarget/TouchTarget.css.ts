import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

// type IModifier = IInteraction;

const classNames = createStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(${themeTokens.density.minTargetSize}, 100%)`,
    height: `max(${themeTokens.density.minTargetSize}, 100%)`,
    transform: 'translate(-50%, -50%)',
    // zIndex: 1,

    // selectors: {
    //   [getModifierSelector<IModifier>('hovered')]: {
    //     zIndex: 2,
    //   },
    // },
  },
});

export type ITouchTargetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const touchTargetTheme = componentThemeFactory<ITouchTargetThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
