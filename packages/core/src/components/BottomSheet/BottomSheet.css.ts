import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'full-height' | 'detached';

const [tokensClassName, tokens] = createTheme({
  fixedHorizontalSpace: {
    normal: px(56),
    compact: px(0),
    detached: px(space(4)),
  },
  fixedTopSpace: px(72),
});

const classNames = createStyles({
  root: {
    height: calc.subtract('max-content', tokens.fixedTopSpace),
    minHeight: px(56),
    left: tokens.fixedHorizontalSpace.normal,
    right: tokens.fixedHorizontalSpace.normal,

    '@container': {
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        left: tokens.fixedHorizontalSpace.compact,
        right: tokens.fixedHorizontalSpace.compact,

        selectors: {
          [getModifierSelector<IModifier>('detached')]: {
            left: tokens.fixedHorizontalSpace.detached,
            right: tokens.fixedHorizontalSpace.detached,
          },
        },
      },
    },

    selectors: {
      [getModifierSelector<IModifier>('full-height')]: {
        top: tokens.fixedTopSpace,
      },
      [getModifierSelector<IModifier>('detached')]: {
        left: tokens.fixedHorizontalSpace.detached,
        right: tokens.fixedHorizontalSpace.detached,
      },
    },
  },
  bottomSheetContent: {
    flexGrow: 1,
  },
});

export type IBottomSheetThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const bottomSheetTheme = componentThemeFactory<IBottomSheetThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
