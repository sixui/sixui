import { createTheme } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = IInteraction | 'disabled' | 'checked' | 'loading';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  //
});

const classNames = createStyles({
  root: {
    //
  },
  focusRing: {
    //
  },
  input: {
    //
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
