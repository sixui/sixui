import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'size';

const DENSITY = px(getDensity({ min: -5, max: 0 }));

const classNames = createStyles({
  root: {
    flexGrow: 1,
    paddingLeft: px(space(3)),
    paddingRight: px(space(3)),
    paddingTop: px(space(2)),
    paddingBottom: px(space(2)),
    ...getTypographyStyles(themeTokens.typeScale.label.sm),

    selectors: {
      [getModifierSelector<IModifier>({ size: 'xs' })]: {
        flexBasis: calc.add('30px', DENSITY),
      },
      [getModifierSelector<IModifier>({ size: 'sm' })]: {
        flexBasis: calc.add('40px', DENSITY),
      },
      [getModifierSelector<IModifier>({ size: 'md' })]: {
        flexBasis: calc.add('50px', DENSITY),
      },
      [getModifierSelector<IModifier>({ size: 'lg' })]: {
        flexBasis: calc.add('65px', DENSITY),
      },
      [getModifierSelector<IModifier>({ size: 'xl' })]: {
        flexBasis: calc.add('75px', DENSITY),
      },
    },
  },
});

export type IColorSchemeRoleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const colorSchemeRoleTheme =
  componentThemeFactory<IColorSchemeRoleThemeFactory>({
    classNames,
    tokens: undefined,
  });
