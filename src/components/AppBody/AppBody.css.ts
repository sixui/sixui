import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'with-aside' | 'with-header';

const classNames = createStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',

    // gap: {
    //   default: 'unset',
    //   // '@container compact (min-width: 0)': spacingTokens.padding$4,
    //   // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
    //   // TODO: use better media queries
    //   '@media (min-width: 0) and (max-width: compact)': spacingTokens.padding$4,
    //   '@media (min-width: compact)': spacingTokens.padding$6,
    // },
    // marginInline: {
    //   default: 'unset',
    //   // '@container compact (min-width: 0)': spacingTokens.padding$4,
    //   // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
    //   // TODO: use better media queries
    //   '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
    //   '@media (min-width: 600)': spacingTokens.padding$6,
    // },

    // borderWidth: '2px',
    // borderStyle: 'solid',
    // borderColor: getResponsiveCssValue({
    //   op: '<',
    //   size: 'medium',
    //   then: 'green',
    //   else: 'red',
    // }),

    selectors: {
      // [getModifierSelector({ 'window-size': 'compactAndUp' }, '#sixui-root')]: {
      //   border: '2px solid red',
      // },
    },

    '@media': {
      //
    },

    containerName: 'test',
    containerType: 'normal',
  },
  test: {
    border: '8px solid red',

    '@container': {
      [getResponsiveContainerQuery({ size: 'medium', op: '!=' })]: {
        border: '8px solid green',
      },
    },
  },
});

export type IAppBodyThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const appBodyTheme = componentThemeFactory<IAppBodyThemeFactory>({
  classNames,
  tokens: undefined,
});
