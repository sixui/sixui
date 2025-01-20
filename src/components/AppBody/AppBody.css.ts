import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getResponsiveCssValue } from '~/helpers/styles/getResponsiveCssValue';
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
    //   '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
    //   '@media (min-width: 600)': spacingTokens.padding$6,
    // },
    // marginInline: {
    //   default: 'unset',
    //   // '@container compact (min-width: 0)': spacingTokens.padding$4,
    //   // '@container mediumAndUp (min-width: 0)': spacingTokens.padding$6,
    //   // TODO: use better media queries
    //   '@media (min-width: 0) and (max-width: 599)': spacingTokens.padding$4,
    //   '@media (min-width: 600)': spacingTokens.padding$6,
    // },

    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: getResponsiveCssValue({
      op: '<',
      size: 'medium',
      then: 'green',
      else: 'red',
    }),

    selectors: {
      // [getModifierSelector({ 'window-size': 'compactAndUp' }, '#sixui-root')]: {
      //   border: '2px solid red',
      // },
    },

    '@media': {
      //
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
