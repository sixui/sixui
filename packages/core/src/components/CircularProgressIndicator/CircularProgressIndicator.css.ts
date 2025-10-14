import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { em } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './CircularProgressIndicator.constants';

type IModifier = 'disabled' | 'negative';
export type ICircularProgressIndicatorModifier = IModifier;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    size: em(1),
    padding: px(0),
  },
  activeIndicator: {
    color: {
      normal: themeTokens.colorScheme.primary,
      negative: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  inactiveTrack: {
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  strokeWidth: `round(up, max(${px(2)}, ${em(0.06)}), 1px)`,
});

const classNames = createStyles({
  root: {
    position: 'relative',
    color: tokens.activeIndicator.color.normal,

    contentVisibility: 'auto',
    contain: 'strict',

    width: tokens.container.size,
    height: tokens.container.size,

    selectors: {
      [modifierSelector<IModifier>('negative')]: {
        color: tokens.activeIndicator.color.negative,
      },
    },
  },
  progress: {
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    borderRadius: themeTokens.shape.corner.circle,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    alignSelf: 'stretch',
    margin: tokens.container.padding,
  },
});

export type ICircularProgressIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const circularProgressIndicatorTheme =
  componentThemeFactory<ICircularProgressIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
