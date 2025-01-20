import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'with-header' | 'with-aside';

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: '100vh',

    '@container': {
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        gap: px(space(4)),
        marginInline: px(space(4)),
      },
      [getResponsiveContainerQuery({ op: '>=', size: 'medium' })]: {
        gap: px(space(6)),
        marginInline: px(space(6)),
      },
    },

    selectors: {
      [getModifierSelector<IModifier>('with-header')]: {
        minHeight: calc.subtract('100vh', appLayoutTheme.tokens.header.height),
      },
      [getModifierSelector<IModifier>('with-aside')]: {
        marginRight: 0,
      },
    },
  },
});

export type IAppLayoutBodyThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const appLayoutBodyTheme =
  componentThemeFactory<IAppLayoutBodyThemeFactory>({
    classNames,
    tokens: undefined,
  });
