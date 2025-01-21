import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { appLayoutTheme } from '../AppLayout/AppLayout.css';

type IModifier = 'orientation' | 'with-header';

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: '100vh',

    '@container': {
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        gap: px(space(4)),
        marginLeft: px(space(4)),
        marginRight: px(space(4)),
      },
      [getResponsiveContainerQuery({ op: '>=', size: 'medium' })]: {
        gap: px(space(6)),
        marginLeft: px(space(6)),
        marginRight: px(space(6)),
      },
    },

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
      },
      [getModifierSelector<IModifier>('with-header')]: {
        minHeight: calc.subtract('100vh', appLayoutTheme.tokens.header.height),
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
