import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'disabled';

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
    tokens: null,
  });
