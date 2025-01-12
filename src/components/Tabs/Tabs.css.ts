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
  container: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
  label: {
    color: {
      normal: 'unset',
      disabled: 'unset',
    },
  },
});

const classNames = createStyles({
  root: {
    backgroundColor: tokens.container.color.normal,
    color: tokens.label.color.normal,
    padding: px(space(2)),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        backgroundColor: tokens.container.color.disabled,
        color: tokens.label.color.disabled,
      },
    },
  },
});

export type ITabsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const basicTemplateTheme = componentThemeFactory<ITabsThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
