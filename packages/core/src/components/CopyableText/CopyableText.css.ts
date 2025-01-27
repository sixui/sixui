import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme();

const classNames = createStyles({
  label: {
    textDecorationStyle: 'dashed',
  },
});

export type ICopyableTextThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const copyableTextTheme =
  componentThemeFactory<ICopyableTextThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
