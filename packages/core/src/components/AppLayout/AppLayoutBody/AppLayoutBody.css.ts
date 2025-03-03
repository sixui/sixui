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

type IModifier =
  | 'orientation'
  | 'detached'
  | 'with-top-bar'
  | 'with-side-navigation'
  | 'with-side-sheet'
  | 'fixed-height';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: calc.subtract('100vh', appLayoutTheme.tokens.topBar.height),

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: fallbackVar(
          appLayoutTheme.tokens.body.color,
          themeTokens.colorScheme.surface,
        ),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>({ 'fixed-height': true })]: {
        minHeight: 'unset',
        height: calc.subtract('100vh', appLayoutTheme.tokens.topBar.height),
      },
    },
  },
  inner: ({ root }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    gap: px(space('$xl')),
    padding: px(space('$xl')),
    transitionProperty: 'margin',
    transitionDuration: themeTokens.motion.duration.short2,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,

    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        gap: px(space('$lg')),
        padding: px(space('$lg')),
      },
    },

    selectors: {
      [modifierSelector<IModifier>('detached', root)]: {
        backgroundColor: themeTokens.colorScheme.surfaceContainerLowest,
        borderRadius: themeTokens.shape.corner.lg,
        margin: px(space('$xl')),

        '@container': {
          [responsiveContainerQuery({ size: 'compact' })]: {
            margin: px(space('$lg')),
          },
        },
      },
      [modifierSelector<IModifier>(['detached', 'with-side-navigation'], root)]:
        {
          marginLeft: px(0),
        },
      [modifierSelector<IModifier>(['detached', 'with-side-sheet'], root)]: {
        marginRight: px(0),
      },
      [modifierSelector<IModifier>(['detached', 'with-top-bar'], root)]: {
        marginTop: px(0),
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        flexDirection: 'column',
      },
    },
  }),
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
