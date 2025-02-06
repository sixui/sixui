import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './BottomSheet.constants';

type IModifier = 'full-height' | 'detached';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  fixedHorizontalSpace: {
    normal: px(56),
    compact: px(0),
    detached: px(space(4)),
  },
  fixedTopSpace: px(72),
});

const classNames = createStyles({
  root: {
    height: `min(max-content, ${calc.subtract('100%', tokens.fixedTopSpace)})`,
    minHeight: px(56),
    left: tokens.fixedHorizontalSpace.normal,
    right: tokens.fixedHorizontalSpace.normal,
    top: 'auto',

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        left: tokens.fixedHorizontalSpace.compact,
        right: tokens.fixedHorizontalSpace.compact,

        selectors: {
          [modifierSelector<IModifier>('detached')]: {
            left: tokens.fixedHorizontalSpace.detached,
            right: tokens.fixedHorizontalSpace.detached,
          },
        },
      },
    },

    selectors: {
      [modifierSelector<IModifier>('detached')]: {
        left: tokens.fixedHorizontalSpace.detached,
        right: tokens.fixedHorizontalSpace.detached,
      },
    },
  },
  bottomSheetContent: ({ root }) => ({
    flexGrow: 1,

    selectors: {
      [modifierSelector<IModifier>('full-height', root)]: {
        height: calc.subtract('100vh', tokens.fixedTopSpace),
      },
    },
  }),
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
