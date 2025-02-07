import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';
import { space } from '~/utils/css/space';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutBody.constants';

type IModifier = 'orientation' | 'with-top-bar';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: '100vh',
    gap: px(space(6)),
    marginLeft: px(space(6)),
    marginRight: px(space(6)),
    paddingTop: px(space(6)),
    paddingBottom: px(space(6)),

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        gap: px(space(4)),
        marginLeft: px(space(4)),
        marginRight: px(space(4)),
        paddingTop: px(space(4)),
        paddingBottom: px(space(4)),
      },
    },

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: fallbackVar(
          appLayoutTheme.tokens.body.color,
          themeTokens.colorScheme.surface,
        ),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
      },
      [modifierSelector<IModifier>('with-top-bar')]: {
        minHeight: calc.subtract('100vh', appLayoutTheme.tokens.topBar.height),
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
    tokensClassName,
    tokens,
  });
