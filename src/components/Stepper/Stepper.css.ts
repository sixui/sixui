import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  //
});

const classNames = createStyles({
  root: {
    //
  },
});

export type IStepperThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepperTheme = componentThemeFactory<IStepperThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
