import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
});

const classNames = createStyles({
  label: {
    textDecorationStyle: 'dashed',
  },
});

export type ICopyableTextThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const copyableTextTheme =
  componentThemeFactory<ICopyableTextThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
