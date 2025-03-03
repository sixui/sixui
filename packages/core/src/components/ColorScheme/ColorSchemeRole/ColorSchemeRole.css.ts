import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './ColorSchemeRole.constants';

type IModifier = 'size';

const DENSITY = px(density({ min: -5, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    flexGrow: 1,
    paddingLeft: px(space('$md')),
    paddingRight: px(space('$md')),
    paddingTop: px(space('$sm')),
    paddingBottom: px(space('$sm')),
    ...typography(themeTokens.typeScale.label.sm),

    selectors: {
      [modifierSelector<IModifier>({ size: 'xs' })]: {
        flexBasis: calc.add('30px', DENSITY),
      },
      [modifierSelector<IModifier>({ size: 'sm' })]: {
        flexBasis: calc.add('40px', DENSITY),
      },
      [modifierSelector<IModifier>({ size: 'md' })]: {
        flexBasis: calc.add('50px', DENSITY),
      },
      [modifierSelector<IModifier>({ size: 'lg' })]: {
        flexBasis: calc.add('65px', DENSITY),
      },
      [modifierSelector<IModifier>({ size: 'xl' })]: {
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
    tokensClassName,
    tokens,
  });
