import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { appLayoutTheme } from '~/components/AppLayout/AppLayout.css';
import { COMPONENT_NAME } from './AppLayoutBody.constants';

type IModifier = 'orientation' | 'with-header';

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
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        gap: px(space(4)),
        marginLeft: px(space(4)),
        marginRight: px(space(4)),
        paddingTop: px(space(4)),
        paddingBottom: px(space(4)),
      },
    },

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: fallbackVar(
          appLayoutTheme.tokens.body.color,
          themeTokens.colorScheme.surface,
        ),
      },
    }),

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
    tokensClassName,
    tokens,
  });
