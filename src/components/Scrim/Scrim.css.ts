import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'fixed' | 'center' | 'blurred';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    shape: px(themeTokens.shape.corner.none),
    filter: 'none',
    blurredFilter: 'blur(2px)',
    color: `color-mix(in srgb, ${themeTokens.colorScheme.scrim} 50%, transparent)`,
  },
});

const classNames = createStyles({
  root: {
    inset: 0,
    position: 'absolute',
    borderRadius: tokens.container.shape,
    backdropFilter: tokens.container.filter,
    backgroundColor: tokens.container.color,

    selectors: {
      [getModifierSelector<IModifier>('fixed')]: {
        position: 'fixed',
      },
      [getModifierSelector<IModifier>('center')]: {
        display: 'grid',
        placeItems: 'center',
      },
      [getModifierSelector<IModifier>('blurred')]: {
        backdropFilter: tokens.container.blurredFilter,
      },
    },
  },
});

export type IScrimThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const scrimTheme = componentThemeFactory<IScrimThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
