import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'disabled' | 'expanded' | 'orientation';

const [tokensClassName, tokens] = createTheme({
  transitionProperty: 'none',
  collapsedWidth: 'auto',
  collapsedHeight: 'auto',
  expandedWidth: 'initial',
  expandedHeight: 'initial',
  visibility: 'hidden',
});

const classNames = createStyles({
  root: {
    overflow: 'hidden',

    selectors: {
      [getModifierSelector<IModifier>('expanded')]: {
        overflow: 'visible',
      },
    },
  },
  content: ({ root }) => ({
    overflow: 'hidden',
    width: tokens.expandedWidth,
    height: tokens.expandedHeight,

    selectors: {
      [getModifierSelector<IModifier>('expanded', root)]: {
        overflow: 'visible',
      },
    },
  }),
  motion$initial: {},
  motion$entering: {
    width: tokens.expandedWidth,
    height: tokens.expandedHeight,
    transitionProperty: tokens.transitionProperty,
    transitionDuration: themeTokens.motion.duration.long.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,
  },
  motion$entered: {
    width: tokens.expandedWidth,
    height: tokens.expandedHeight,
  },
  motion$exiting: {
    width: tokens.collapsedWidth,
    height: tokens.collapsedHeight,
    transitionProperty: tokens.transitionProperty,
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
  },
  motion$exited: {
    width: tokens.collapsedWidth,
    height: tokens.collapsedHeight,
    visibility: tokens.visibility,
  },
  motion$unmounted: {},
});

export type IExpandableThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
}>;

export const expandableTheme = componentThemeFactory<IExpandableThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
