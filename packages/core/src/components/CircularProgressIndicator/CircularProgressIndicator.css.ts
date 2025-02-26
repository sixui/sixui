import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { em } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './CircularProgressIndicator.constants';

export type ICircularProgressIndicatorModifier = 'disabled' | 'negative';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  track: {
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
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
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
  size: em(1),
  containerPadding: px(0),
  strokeWidth: `round(up, max(${px(2)}, ${em(0.06)}), 1px)`,
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.activeIndicator.color.normal,
    borderColor: 'currentColor',

    width: tokens.size,
    height: tokens.size,

    selectors: {
      [modifierSelector<ICircularProgressIndicatorModifier>('negative')]: {
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
    margin: tokens.containerPadding,
  },
  track: ({ root }) => ({
    color: tokens.track.color.normal,

    selectors: {
      [modifierSelector<ICircularProgressIndicatorModifier>('disabled', root)]:
        {
          color: tokens.track.color.disabled,
          opacity: tokens.track.opacity.disabled,
        },
    },
  }),
  activeIndicator: ({ root }) => ({
    color: tokens.activeIndicator.color.normal,

    selectors: {
      [modifierSelector<ICircularProgressIndicatorModifier>('disabled', root)]:
        {
          color: tokens.activeIndicator.color.disabled,
          opacity: tokens.activeIndicator.opacity.disabled,
        },
      [modifierSelector<ICircularProgressIndicatorModifier>(
        ['!disabled', 'negative'],
        root,
      )]: {
        color: tokens.activeIndicator.color.negative,
      },
    },
  }),
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
